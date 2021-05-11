import React from "react"
import Header from "./Header"

const PageWrapper = ({ children }) => {
  return (
    <div>
      <main className="w-screen px-14">
        <div className="max-w-xl m-auto pb-20">
          <Header />
          <div className="relative pt-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default PageWrapper
