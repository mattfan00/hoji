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
        <Header />
        <div className="max-w-xl m-auto pt-10 pb-20">
          {children}
        </div>
      </main>
    </div>
  )
}

export default PageWrapper