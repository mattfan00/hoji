import React from "react"
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import FadeInRoute from "./Components/FadeInRoute"

import Home from "./Views/Home"
import Profile from "./Views/Profile"
import Settings from "./Views/Settings"
import Bookmarks from "./Views/Bookmarks"
import Entry from "./Views/Entry"

import Login from "./Views/Auth/Login"
import Register from "./Views/Auth/Register"

import NewThought from "./Views/New/NewThought"
import NewPost from "./Views/New/NewPost"
import NewGallery from "./Views/New/NewGallery"

const FadeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => (
        <FadeInRoute>
          <Component {...routeProps} />
        </FadeInRoute>
      )}
    />
  );
}

const Routes = () => {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={{ enter: 300, exit: 200 }}
      >
        <Switch location={location}>
          <FadeRoute exact path="/" component={Home} />
          <FadeRoute exact path="/settings" component={Settings} />
          <FadeRoute exact path="/bookmarks" component={Bookmarks} />
          <FadeRoute exact path="/entry/:id" component={Entry} />

          <FadeRoute exact path="/login" component={Login} />
          <FadeRoute exact path="/register" component={Register} />

          <FadeRoute exact path="/:username" component={Profile} />

          <FadeRoute exact path="/thought/new" component={NewThought} />
          <FadeRoute exact path="/post/new" component={NewPost} />
          <FadeRoute exact path="/gallery/new" component={NewGallery} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Routes
