import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Components/Button"
import Dropdown from "../Components/Dropdown"
import Logo from "../Icons/Logo"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"

const Header = () => {
  const { user, setUser, loading } = useContext(AuthContext)
  const history = useHistory()

  const handleLogout = () => {
    const logout = async () => {
      try {
        await axios.get("/auth/logout")
        setUser(null)

        history.push("/")
      } catch(err) {
        console.log(err.response)
      }
    }
    
    logout()
  }

  return (
    <header className="flex items-center pt-6 mb-4">
      {!loading ? (
      <>
        <div className="flex items-center">
          <div className="logo w-10 mr-6">
            <Link to="/"><Logo /></Link>
          </div>
        </div>
        <div className="flex items-center">
          {user ? (
          <>
            <Dropdown className="mr-3">
              <Dropdown.Button>
                {user.username}
              </Dropdown.Button>

              <Dropdown.Item href={`/${user.username}`}>
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
              <Dropdown.Item onClick={handleLogout}>
                <FontAwesomeIcon className="fa-fw mr-1.5" icon="sign-out-alt" />
                Logout
              </Dropdown.Item>
            </Dropdown>

            <Button href="/entry/new">
              <FontAwesomeIcon className="mr-1.5" icon="plus" />
              New
            </Button>
          </>
          ) : (
          <Button href="/login">
            <FontAwesomeIcon icon="sign-in-alt" />
          </Button>
          )}
        </div>
      </>
      ) : ""}
    </header>
  )
}

export default Header
