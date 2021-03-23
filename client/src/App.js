import React from "react"
import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes"
import PageWrapper from "./Components/PageWrapper"

const App = () => {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes />
      </PageWrapper>
    </BrowserRouter>
  )
}

export default App
