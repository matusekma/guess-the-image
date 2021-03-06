import React from "react";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Router, Switch, Route, Redirect } from "react-router-dom";
import LoginOrRegister from "./components/LoginOrRegister";
import PrivateRouteContainer from "./containers/PrivateRouteContainer";
import NotFound from "./components/NotFound";
import { createBrowserHistory } from "history";
import Profile from "./components/Profile";
import PostDrawer from "./components/PostDrawer";
import NewPostModePicker from "./components/NewPostModePicker";
import LazyInfinitePostFeed from "./components/LazyInfinitePostFeed";
import { getPostsCall, getMyPostsCall } from "./apiCalls/postApiCalls";
import PostDetailsPage from "./components/PostDetailsPage";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth">
          <LoginOrRegister />
        </Route>

        <Route exact path="/">
          <Redirect
            to={{
              pathname: "/posts",
              state: { from: history.location },
            }}
          />
        </Route>
        <PrivateRouteContainer key="posts" exact path="/posts">
          <LazyInfinitePostFeed getPosts={getPostsCall} />
        </PrivateRouteContainer>
        <PrivateRouteContainer exact path="/posts/:id">
          <PostDetailsPage />
        </PrivateRouteContainer>
        <PrivateRouteContainer key="myposts" exact path="/myposts">
          <LazyInfinitePostFeed getPosts={getMyPostsCall} />
        </PrivateRouteContainer>
        <PrivateRouteContainer exact path="/new">
          <NewPostModePicker />
        </PrivateRouteContainer>
        <PrivateRouteContainer exact path="/new/draw">
          <PostDrawer />
        </PrivateRouteContainer>
        <PrivateRouteContainer exact path="/profile">
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
