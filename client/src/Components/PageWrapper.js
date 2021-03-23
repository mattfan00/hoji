import React from "react"
import Header from "./Header"

const PageWrapper = ({ children }) => {
  return (
    <div className="container max-w-2xl w-full mx-auto mt-16 px-4">
      <Header />
      {children}
    </div>
  )
}

export default PageWrapper