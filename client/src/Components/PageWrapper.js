import React from "react"
import Header from "./Header"

const PageWrapper = ({ children }) => {
  return (
    <div>
      <main className="w-screen px-6 xs:px-14">
        <div className="max-w-xl m-auto pb-20">
          <Header />
          <div className="relative pt-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default PageWrapper
