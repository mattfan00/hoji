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
        {/* <Button className="mr-3" href="/mattfan00">
          <FontAwesomeIcon icon="user" />
        </Button> */}

        <Dropdown className="mr-3" >
          <Dropdown.Button>
            {/* <FontAwesomeIcon icon="user" /> */}
            @mattfan00
          </Dropdown.Button>

          <Dropdown.Item href="/mattfan00">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon="user" />
            Profile
          </Dropdown.Item>
          <Dropdown.Item href="/settings">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon="cog" />
            Settings
          </Dropdown.Item>
          <Dropdown.Item href="/bookmarks">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon="bookmark" />
            Bookmarks
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

        {/* <Dropdown>
          <Dropdown.Button>
            <FontAwesomeIcon className="mr-1.5" icon="plus" />
            New
          </Dropdown.Button>

          <Dropdown.Item href="/thought/new">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "lightbulb"]} />
            Thought
          </Dropdown.Item>
          <Dropdown.Item href="/post/new">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon="pencil-alt" />
            Post
          </Dropdown.Item>
          <Dropdown.Item href="/gallery/new">
            <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "images"]} />
            Gallery
          </Dropdown.Item>
        </Dropdown> */}
      </div>
    </header>
  )
}

export default Header
