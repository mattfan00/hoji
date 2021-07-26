import NextLink from "../components/NextLink"
import Logo from "../icons/Logo"
import { useAuth } from "../contexts/auth"

const Footer = ({
  author,
}) => {
  const { user, isLoading } = useAuth()

  return (
    <footer className="mt-32 py-10 flex items-center justify-center">
      {!isLoading ? (
        <>
          <NextLink 
            href="/"
          >
            <Logo className="w-10 mr-8" />
          </NextLink>
          <NextLink 
            href={`/${author.username}`}
            className="mr-8 text-gray-500"
          >
            Back to profile 
          </NextLink>
          <NextLink 
            href={user ? `/${user.username}` : "/"}
            className="mr-8 text-gray-500"
          >
              {user ? "Me" : "Login"}
          </NextLink>
        </>
      ) : ""}
    </footer>
  )
}

export default Footer
