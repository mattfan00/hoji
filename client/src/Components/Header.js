import React, { useContext } from "react"
import { useMutation } from "react-query"
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from "../Components/Button"
import Dropdown from "../Components/Dropdown"
import Logo from "../Icons/Logo"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"

const Header = () => {
  const logoutMutation = useMutation(() => axios.post("/auth/logout"), {
    onSuccess: () => {
      setUser(null)
      history.push("/")
    }
  })
  const { user, setUser, loading } = useContext(AuthContext)
  const history = useHistory()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  if (loading) {
    return <></>
  }

  return (
    <header className="flex items-center pt-6 mb-4">
      <>
        <div className="flex items-center">
          <div className="logo w-8 mr-5">
            <Link to={user ? "/discover" : "/"}><Logo /></Link>
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
              <FontAwesomeIcon icon="plus" />
            </Button>
          </>
          ) : (
          <Button href="/login">
            <FontAwesomeIcon icon="sign-in-alt" />
          </Button>
          )}
        </div>
      </>
    </header>
  )
}

export default Header
