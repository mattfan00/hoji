import { Button, Dropdown } from "../ui"
import { useAuth } from "../contexts/auth"
import NextLink from "../components/NextLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

const Header = ({ profile }) => {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 bg-white z-20">
      <div 
        className={
          classNames(
            "h-20 flex items-center max-w-2xl mx-auto mb-14", 
            { "justify-end": !profile }
          )
        }
      >
        {profile ? (
        <div className="flex flex-1 items-center">
          <div className="flex items-baseline">
            <NextLink href={`/${profile.username}`}>
              <h3>{profile.name}</h3>
            </NextLink>
            <div className="ml-6">
              <NextLink 
                href={`/${profile.username}/about`}
                className="text-gray-500"
              >
                About
              </NextLink>
            </div>
          </div>
        </div>
        ) : ""}

        <div>
          {user && profile ? (
            user.username === profile.username ? (
              <Button href="/entry/new" className="mr-2">
              <FontAwesomeIcon icon="plus" size="sm" />
            </Button>
            ) : (
            <Button className="mr-2">
              <FontAwesomeIcon icon={["fas", "bookmark"]} size="sm" />
            </Button>
            )
          ) : ""}

          <Dropdown>
            <Dropdown.Button>
              <FontAwesomeIcon icon="bars" size="sm" />
            </Dropdown.Button>

            <Dropdown.Items 
              direction="left"
            >
              <Dropdown.Item href="/">
                <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                Home
              </Dropdown.Item>
              {user ? (
                <>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Bookmarks
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Settings
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Logout
                </Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Login
                </Dropdown.Item>
              )}
            </Dropdown.Items>
          </Dropdown>
        </div>
      </div>

    </header>
  )
}

export default Header
