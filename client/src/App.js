import React from "react"
import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes"
import PageWrapper from "./Components/PageWrapper"
import { AuthProvider }from "./Context/AuthContext"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageWrapper>
          <Routes />
        </PageWrapper>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
