import React, { useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { PropsFromRedux } from "../containers/PrivateRouteContainer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import { loginSuccess } from "../actions/auth/actionCreators";
import { history } from "../App";

interface PrivateRouteProps extends RouteProps {}

function PrivateRoute({
  children,
  isAuthenticated,
  ...rest
}: PrivateRouteProps & PropsFromRedux & any) {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();
  const dispatch = useDispatch();

  // HANDLE REFRESH
  useEffect(() => {
    if (!token) {
      const storageToken = localStorage.getItem("token");
      if (storageToken) {
        dispatch(loginSuccess(storageToken));
        history.push(location.pathname);
      }
    }
  }, []);

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
