import React from "react";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Router, Switch, Route, Redirect } from "react-router-dom";
import LoginOrRegister from "./components/LoginOrRegister";
import PrivateRouteContainer from "./containers/PrivateRouteContainer";
import NotFound from "./components/NotFound";
import { createBrowserHistory } from "history";
import Profile from "./components/Profile";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth">
          <LoginOrRegister />
        </Route>

        <PrivateRouteContainer exact path="/">
          <Redirect
            to={{
              pathname: "/posts",
            }}
          />
        </PrivateRouteContainer>
        <PrivateRouteContainer path="/posts">Posztok</PrivateRouteContainer>
        <PrivateRouteContainer path="/archive">Archívum</PrivateRouteContainer>
        <PrivateRouteContainer path="/profile">
          <Profile />
        </PrivateRouteContainer>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
