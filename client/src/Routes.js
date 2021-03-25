import React from "react"
import {
  Switch,
  Route
} from "react-router-dom"

import Home from "./Views/Home"
import Profile from "./Views/Profile"
import NewThought from "./Views/New/NewThought"
import NewPost from "./Views/New/NewPost"
import NewGallery from "./Views/New/NewGallery"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:user" component={Profile} />

      <Route exact path="/thought/new" component={NewThought} />
      <Route exact path="/post/new" component={NewPost} />
      <Route exact path="/gallery/new" component={NewGallery} />
    </Switch>
  )
}

export default Routes