import { Button, Dropdown } from "../ui"
import { useAuth } from "../contexts/auth"
import NextLink from "../components/NextLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "../icons/Logo"

const Header = ({ profile }) => {
  const { user } = useAuth()

  return (
    <header className="w-screen px-8">
      <div className="max-w-2xl mx-auto py-6">
        <div className="flex items-center justify-between">
          <NextLink href="/">
            <Logo className="w-8" />
          </NextLink>
          <div>
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

        {profile ? (
        <div className="pt-24">
          <div className="flex flex-col">
            <h1>{profile.name}</h1>
            <div className="pt-2 text-gray-500">
              <NextLink 
                href={`/${profile.username}`}
                className="mr-4"
              >Blog</NextLink>
              <NextLink 
                href={`/${profile.username}/about`}
                className="mr-4"
              >About</NextLink>
            </div>
          </div>
        </div>
        ) : ""}
      </div>

    </header>
  )
}

export default Header
