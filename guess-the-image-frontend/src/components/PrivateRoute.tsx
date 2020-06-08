import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Navbar from "./Navbar";

interface PrivateRouteProps extends RouteProps {}

function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const isAuthenticated = true;
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
