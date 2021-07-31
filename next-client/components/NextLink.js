import Link from "next/link"

const NextLink = ({ 
  href, 
  children, 
  ...rest
}) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

export default NextLink
