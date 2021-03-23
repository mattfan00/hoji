import React from "react"
import {
  Switch,
  Route
} from "react-router-dom"

import Home from "./Views/Home"
import Profile from "./Views/Profile"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:user" component={Profile} />
    </Switch>
  )
}

export default Routes