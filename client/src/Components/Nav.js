import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "./Button"
import Logo from "../Icons/Logo"

const Nav = () => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <div className="absolute bottom-8 left-8">
        <div className="logo w-10 mr-8">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="flex border border-solid border-gray-100 rounded-lg px-2 py-1 bg-white shadow-sm">
          <div className="mx-1 p-2 fill-current text-gray-300">
            <FontAwesomeIcon className="text-gray-300 font-light" icon="home" />
          </div>
          <div className="mx-1 p-2">
            <FontAwesomeIcon className="text-gray-300" icon="user" />
          </div>
          <div className="mx-1 p-2">
            <FontAwesomeIcon className="text-gray-300" icon="cog" />
          </div>
          <button className="mx-1 px-3 hover:bg-gray-50 focus:outline-none rounded-full transition-colors">
            <FontAwesomeIcon className="text-gray-300" icon="sign-out-alt" />
          </button>
        </div>
      </div>
    </>
  )
}


export default Nav