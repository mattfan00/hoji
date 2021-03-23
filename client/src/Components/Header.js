import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons'

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
        <button className="bg-primary text-white uppercase font-bold text-xs px-5 py-2 rounded-lg focus:outline-none">
          {/* <i className="fas fa-plus mr-1.5"></i> */}
          <FontAwesomeIcon className="mr-1.5" icon={faPlus} />
          New
        </button>
        <div className="ml-6 flex items-center">
          mattfan00
          {/* <i class="fas fa-chevron-down text-xs ml-2"></i> */}
          <FontAwesomeIcon className="ml-2" icon={faChevronDown} size="xs" />
        </div>
      </div>
    </header>
  )
}

export default Header
