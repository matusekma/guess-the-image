import React, { useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import Navbar from "./Navbar";
import { PropsFromRedux } from "../containers/PrivateRouteContainer";
import { RootState } from "../reducers/rootReducer";
import { loginSuccess } from "../actions/auth/actionCreators";
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
  const location = useLocation();
  const dispatch = useDispatch();

  // HANDLE REFRESH
  useEffect(() => {
    try {
      let token = reduxToken;
      if (!token) {
        token = localStorage.getItem("token");
      }
      if (token && checkTokenNotExpired(token)) {
        dispatch(loginSuccess(token));
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
        history.push(location.pathname);
      }
    } catch {
      // Invalid token, do nothing
    }
  }, [dispatch, reduxToken]);

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
