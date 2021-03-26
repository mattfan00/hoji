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
          <FadeRoute exact path="/:user" component={Profile} />

          <FadeRoute exact path="/thought/new" component={NewThought} />
          <FadeRoute exact path="/post/new" component={NewPost} />
          <FadeRoute exact path="/gallery/new" component={NewGallery} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Routes