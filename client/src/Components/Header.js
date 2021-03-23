import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Components/Button"

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-20">
      <div className="flex items-center">
        <div className="logo">
          <Link to="/">
            <img className="w-14 mr-8" src="/hoji.svg" />
          </Link>
        </div>
        <div className="nav-items flex">
          <div className="mx-3 font-semibold">
            <Link to="/">discover</Link>
          </div>
          <div className="mx-3 font-semibold">
            <Link to="/">about</Link>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {/* <button className="bg-primary text-white uppercase font-bold text-xs px-5 py-2 rounded-lg focus:outline-none">
          <FontAwesomeIcon className="mr-1.5" icon="plus" />
          New
        </button> */}
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
