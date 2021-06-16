import React, { useContext } from "react"
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import FadeInRoute from "./Components/FadeInRoute"
import ScrollToTop from "./Components/ScrollToTop"
import { AuthContext } from "./Context/AuthContext"

import Landing from "./Views/Landing"
import Discover from "./Views/Discover"
import Profile from "./Views/Profile"
import Settings from "./Views/Settings"
import Bookmarks from "./Views/Bookmarks"
import Entry from "./Views/Entry"

import Login from "./Views/Auth/Login"
import Register from "./Views/Auth/Register"

import NewEntry from "./Views/NewEntry"
import EditEntry from "./Views/EditEntry"

import Custom404 from "./Views/404"


const CustomRoute = ({ component: Component, auth, scrollToTop, ...rest }) => {
  const { user, loading } = useContext(AuthContext)
  
  if (loading) {
    return <></>
  }

  return (
    <Route
      {...rest}
      render={routeProps => (
        user || !auth ? (
          <>
            {scrollToTop ? (
              <ScrollToTop />
            ): ""}
            <Component {...routeProps} />
          </>
        ) : <Redirect to="/login" />
      )}
    />
  );
}

const Routes = () => {
  const location = useLocation()

  return (
    /*
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={{ enter: 300, exit: 200 }}
      >
      */
        <Switch location={location}>
          <CustomRoute exact path="/" component={Landing} />
          <CustomRoute exact path="/discover" component={Discover} />
          <CustomRoute auth={true} exact path="/settings" component={Settings} />
          <CustomRoute auth={true} exact path="/bookmarks" component={Bookmarks} />
          <CustomRoute auth={true} exact path="/entry/new" component={NewEntry} />
          <CustomRoute scrollToTop={true} exact path="/entry/:id" component={Entry} />
          <CustomRoute scrollToTop={true} auth={true} exact path="/entry/:id/edit" component={EditEntry} />

          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute exact path="/register" component={Register} />

          <CustomRoute exact path="/:username" component={Profile} />

          <CustomRoute component={Custom404} />
        </Switch>
    /*
      </CSSTransition>
    </TransitionGroup>
    */
  )
}

export default Routes
