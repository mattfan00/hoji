import React from "react"
import {
  Switch,
  Route
} from "react-router-dom"

import Home from "./Views/Home"
import Profile from "./Views/Profile"
import NewThought from "./Views/NewThought"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:user" component={Profile} />

      <Route exact path="/thought/new" component={NewThought} />
    </Switch>
  )
}

export default Routes