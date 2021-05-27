import React, { useContext } from "react"
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import FadeInRoute from "./Components/FadeInRoute"
import { AuthContext } from "./Context/AuthContext"

import Home from "./Views/Home"
import Profile from "./Views/Profile"
import Settings from "./Views/Settings"
import Bookmarks from "./Views/Bookmarks"
import Entry from "./Views/Entry"

import Login from "./Views/Auth/Login"
import Register from "./Views/Auth/Register"

import NewEntry from "./Views/NewEntry"
import EditEntry from "./Views/EditEntry"

import Custom404 from "./Views/404"

const FadeRoute = ({ component: Component, auth, ...rest }) => {
  const { user, loading } = useContext(AuthContext)
  
  if (loading) {
    return <></>
  }

  return (
    <Route
      {...rest}
      render={routeProps => (
        user || !auth ? (
          <FadeInRoute>
            <Component {...routeProps} />
          </FadeInRoute>
        ) : <Redirect to="/login" />
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
          <FadeRoute auth={true} exact path="/settings" component={Settings} />
          <FadeRoute auth={true} exact path="/bookmarks" component={Bookmarks} />
          <FadeRoute auth={true} exact path="/entry/new" component={NewEntry} />
          <FadeRoute exact path="/entry/:id" component={Entry} />
          <FadeRoute auth={true} exact path="/entry/:id/edit" component={EditEntry} />

          <FadeRoute exact path="/login" component={Login} />
          <FadeRoute exact path="/register" component={Register} />

          <FadeRoute exact path="/:username" component={Profile} />

          <FadeRoute component={Custom404} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Routes
