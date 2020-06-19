import React, { useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import Navbar from "./Navbar";
import { PropsFromRedux } from "../containers/PrivateRouteContainer";
import { RootState } from "../reducers/rootReducer";
import { loginSuccess, logout } from "../actions/auth/actionCreators";
import { history } from "../App";
import { axiosInstance } from "../apiCalls/axiosConfig";

interface PrivateRouteProps extends RouteProps {}

function checkTokenNotExpired(token: string) {
  const decodedToken: {
    exp: number;
    iat: number;
  } = jwt_decode(token);
  return decodedToken.exp > new Date().getTime() / 1000;
}

function PrivateRoute({
  children,
  isAuthenticated,
  ...rest
}: PrivateRouteProps & PropsFromRedux & any) {
  const reduxToken = useSelector((state: RootState) => state.auth.token);
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();

  // HANDLE REFRESH
  useEffect(() => {
    try {
      let user = null;
      let token = null;
      if (!reduxUser || !reduxToken) {
        let auth: string | any = localStorage.getItem("auth");
        if (auth) {
          auth = JSON.parse(auth);
          token = auth && auth.token;
          user = auth && auth.user;
          if (user && token) {
            if (checkTokenNotExpired(token)) {
              dispatch(loginSuccess(token, user));
              axiosInstance.defaults.headers[
                "Authorization"
              ] = `Bearer ${token}`;
              history.push(location.pathname);
            } else {
              // remove expired token
              localStorage.removeItem("auth");
              dispatch(logout());
              axiosInstance.defaults.headers["Authorization"] = undefined;
            }
          }
        }
      } else if (!checkTokenNotExpired(reduxToken)) {
        // redux Token expired
        dispatch(logout());
        axiosInstance.defaults.headers["Authorization"] = undefined;
      }
    } catch {
      // Invalid token, do nothing
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, reduxToken, reduxUser]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          <>
            <Navbar />
            {children}
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
