import NextLink from "../components/NextLink"
import classNames from "classnames"

export const Button = ({
  children,
  href,
  className,
}) => {
  return (
    href ? (
    <NextLink 
      href={href}
    >
      <button
        className={classNames("btn", className)}
      >
        {children}
      </button>
    </NextLink>
    ) : (
    <button 
      className={classNames("btn", className)}
    >
      {children}
    </button>
    )
  )
}
