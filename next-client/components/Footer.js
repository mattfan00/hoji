import Link from "next/link"
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
          <Link href="/">
            <a className="w-10 mr-8">
              <Logo />
            </a>
          </Link>
          <Link href={`/${author.username}`}>
            <a className="mr-8 text-gray-400">
              Back to profile 
            </a>
          </Link>
          <Link href={user ? `/${user.username}` : "/"}>
            <a className="mr-8 text-gray-400">
              {user ? "Me" : "Login"}
            </a>
          </Link>
        </>
      ) : ""}
    </footer>
  )
}

export default Footer
