import React from "react"
import Header from "./Header"

const PageWrapper = ({ children }) => {
  return (
    <div>
      <main className="w-screen px-14">
        <Header />
        <div className="max-w-xl m-auto pt-10 pb-20">
          {children}
        </div>
      </main>
    </div>
  )
}

export default PageWrapper
