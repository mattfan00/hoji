import NextLink from "../components/NextLink"
import classNames from "classnames"

export const Button = ({
  children,
  href,
  className,
  variant,
  active,
  onClick,
  onMouseDown,
}) => {
  const style = classNames(
    "btn",
    variant ? `btn-${variant}` : "",
    className,
    { "active": active },
  )

  return (
    href ? (
    <NextLink 
      href={href}
    >
      <button
        className={style}
      >
        {children}
      </button>
    </NextLink>
    ) : (
    <button 
      className={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
    )
  )
}
