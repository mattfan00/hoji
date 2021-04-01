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
        <div className="logo w-8 mr-8">
          <Link to="/"><Logo /></Link>
        </div>
      </div>
      <div className="flex items-center">
        <Dropdown className="mr-3">
          <Dropdown.Button>
            mattfan00
          </Dropdown.Button>

          <Dropdown.Item href="/mattfan00">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon="user" />
            Profile
          </Dropdown.Item>
          <Dropdown.Item href="/bookmarks">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon="bookmark" />
            Bookmarks
          </Dropdown.Item>
          <Dropdown.Item href="/settings">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon="cog" />
            Settings
          </Dropdown.Item>
          <Dropdown.Item>
            <FontAwesomeIcon className="fa-fw mr-1.5" icon="sign-out-alt" />
            Logout
          </Dropdown.Item>
        </Dropdown>

        <Button className="mr-3" href="/post/new">
          <FontAwesomeIcon className="mr-1.5" icon="plus" />
          New
        </Button>

        <Button className="mr-3" href="/login">
          <FontAwesomeIcon icon="sign-in-alt" />
        </Button>
      </div>
    </header>
  )
}

export default Header
