import Head from "next/head"
import { QueryClientProvider } from "react-query"
import { queryClient } from "../lib/query"
import { AuthProvider } from "../contexts/auth"

import "../styles/global.css"
import "../fontawesome"

const MyApp = ({ 
  Component, 
  pageProps, 
}) => {
  return (
    <>
      <Head>
        <title>hoji</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <AuthProvider initialUser={pageProps.user}>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
