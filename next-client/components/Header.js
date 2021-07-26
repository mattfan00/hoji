import { Button, Dropdown } from "../ui"
import { useAuth } from "../contexts/auth"
import NextLink from "../components/NextLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

const Header = ({ profile }) => {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 bg-white z-20 w-screen px-8">
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
          {profile.avatar ? (
          <div className="w-11 h-11 rounded overflow-hidden mr-4">
            <img className="object-cover w-full h-full" alt="Avatar" src={profile.avatar} />
          </div>
          ) : ""}
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
          <Button className="mr-2">
            <FontAwesomeIcon icon={["fas", "bookmark"]} size="sm" />
          </Button>
          <Dropdown>
            <Dropdown.Button>
              <FontAwesomeIcon icon="bars" size="sm" />
            </Dropdown.Button>

            <Dropdown.Items 
              direction="left"
            >
              <Dropdown.Item href="/">
                hey
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("hey")}>
                whats up
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown>
        </div>
      </div>

    </header>
  )
}

export default Header
