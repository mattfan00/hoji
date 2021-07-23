import { QueryClientProvider } from "react-query"
import { queryClient } from "../lib/query"
import axios from "axios"

import "../styles/global.css"
import "../fontawesome"

const BASE_URL = "http://localhost:8080"

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

const MyApp = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
