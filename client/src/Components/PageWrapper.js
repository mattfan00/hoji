import React from "react"
import Header from "./Header"
import Nav from "./Nav"

const PageWrapper = ({ children }) => {
  return (
    <div>
      {/* <div className="fixed h-screen z-50">
        <Nav />
      </div> */}
      <main className="w-screen px-14">
        <div className="max-w-xl m-auto pt-16 pb-20">
          <Header />
          {children}
        </div>
      </main>
    </div>
  )
}

export default PageWrapper