import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { Button, Dropdown } from "../ui"
import { useAuth } from "../contexts/auth"
import NextLink from "../components/NextLink"
import ProfileHeader from "../components/ProfileHeader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "../icons/Logo"
import { clientQuery } from "../lib/axios"

const Header = () => {
  const logoutMutation = useMutation(() => clientQuery().post("/auth/logout"), {
    onSuccess: () => {
      setUser(null)
      router.push("/")
    }
  })

  const { user, setUser } = useAuth()
  const router = useRouter()

  return (
    <header className="w-screen px-8 mb-20">
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
                <Dropdown.Item href={`/${user.username}`}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="/entry/new">
                  Write an entry
                </Dropdown.Item>
                {/*
                <Dropdown.Item>
                  <FontAwesomeIcon icon={["far", "bookmark"]} className="mr-1.5 fa-fw" />
                  Bookmarks
                </Dropdown.Item>
                */}
                <Dropdown.Item href="/settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={() => logoutMutation.mutate()}>
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
      </div>

    </header>
  )
}

export default Header
