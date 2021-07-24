import Link from "next/link"
import Logo from "../icons/Logo"

const Footer = ({
  author,
}) => {
  return (
    <footer className="mt-36 py-10 flex items-center justify-center">
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
      <Link href="/">
        <a className="mr-8 text-gray-400">
          Me
        </a>
      </Link>
    </footer>
  )
}

export default Footer
