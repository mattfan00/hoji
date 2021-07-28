import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { Button, Dropdown } from "../ui"
import { useAuth } from "../contexts/auth"
import NextLink from "../components/NextLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "../icons/Logo"
import { clientQuery } from "../lib/axios"

const Header = ({ profile }) => {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const logoutMutation = useMutation(() => clientQuery().post("/auth/logout"), {
    onSuccess: () => {
      setUser(null)
      router.push("/")
    }
  })

  return (
    <header className="w-screen px-8">
      <div className="max-w-2xl mx-auto py-6">
        <div className="flex items-center justify-between">
          <NextLink href="/">
            <Logo className="w-8" />
          </NextLink>
          <div>
            {user ? (
            <Dropdown>
              <Dropdown.Button>
                <FontAwesomeIcon icon="bars" size="sm" />
              </Dropdown.Button>

              <Dropdown.Items 
                direction="left"
              >
                <>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="/entry/new">
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Write an entry
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Bookmarks
                </Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={() => logoutMutation.mutate()}>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Logout
                </Dropdown.Item>
                </>
              </Dropdown.Items>
            </Dropdown>
            ) : (
            <Button href="/login">
              <FontAwesomeIcon icon="sign-in-alt" size="sm" />
            </Button>
            )}
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
