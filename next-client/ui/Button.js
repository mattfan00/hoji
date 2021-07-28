import NextLink from "../components/NextLink"
import classNames from "classnames"

export const Button = ({
  children,
  href,
  className,
  variant,
  active,
  disabled,
  onClick,
  onMouseDown,
}) => {
  const style = classNames(
    "btn",
    variant ? `btn-${variant}` : "",
    { "active": active },
    { "disabled": disabled },
    className,
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
