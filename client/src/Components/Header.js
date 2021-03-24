import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Components/Button"
import Logo from "../Icons/Logo"

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-16">
      <div className="flex items-center">
        <div className="logo w-10 mr-8">
          <Link to="/"><Logo /></Link>
        </div>
        {/* <div className="nav-items flex">
          <div className="mx-3 font-semibold">
            <Link to="/">discover</Link>
          </div>
          <div className="mx-3 font-semibold">
            <Link to="/">about</Link>
          </div>
        </div> */}
      </div>
      <div className="flex items-center">
        <Button type="primary">
          <FontAwesomeIcon className="mr-1.5" icon="plus" />
          New
        </Button>
        <div className="ml-6 flex items-center">
          mattfan00
          <FontAwesomeIcon className="ml-2" icon="chevron-down" size="xs" />
        </div>
      </div>
    </header>
  )
}

export default Header
