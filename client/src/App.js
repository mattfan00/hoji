import React from "react"
import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes"
import PageWrapper from "./Components/PageWrapper"
import { AuthProvider }from "./Context/AuthContext"
import { queryClient } from "./Util/queryClient"
import { QueryClientProvider } from "react-query"

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <PageWrapper>
            <Routes />
          </PageWrapper>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
