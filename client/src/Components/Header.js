import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Components/Button"
import Dropdown from "../Components/Dropdown"
import Logo from "../Icons/Logo"

const Header = () => {
  return (
    <header className="flex items-center pt-6 mb-4">
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
        <Button className="mr-3" href="/matt">
          <FontAwesomeIcon className="mr-1.5" icon="user" />
          mattfan00
        </Button>
        {/* <Button>
          <FontAwesomeIcon className="mr-1.5" icon="plus" />
          New
        </Button> */}
        <Dropdown
          title="New"
          icon="plus"
        >
          <Dropdown.Item href="/thought/new">
            Thought
          </Dropdown.Item>
          <Dropdown.Item href="/post/new">
            Post
          </Dropdown.Item>
          <Dropdown.Item href="/gallery/new">
            Gallery
          </Dropdown.Item>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
