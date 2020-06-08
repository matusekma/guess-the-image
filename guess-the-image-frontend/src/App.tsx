import React from "react";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginOrRegister from "./components/LoginOrRegister";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/auth">
            <LoginOrRegister />
          </Route>

          <PrivateRoute exact path="/">
            <Redirect
              to={{
                pathname: "/posts",
              }}
            />
          </PrivateRoute>
          <PrivateRoute path="/posts">Posztok</PrivateRoute>
          <PrivateRoute path="/archive">Archívum</PrivateRoute>
          <PrivateRoute path="/profile">Profil</PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
