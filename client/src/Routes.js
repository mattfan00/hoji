import React from "react"
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom"

import Home from "./Views/Home"
import Profile from "./Views/Profile"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:user" component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes