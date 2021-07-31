import NextLink from "../components/NextLink"
import classNames from "classnames"

export const Button = ({
  children,
  href,
  className,
  variant,
  size,
  active,
  disabled,
  onClick,
  onMouseDown,
  ...rest
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.stopPropagation()
      onClick(e)
    }
  }

  const handleMouseDown = (e) => {
    if (onMouseDown) {
      e.stopPropagation()
      onMouseDown(e)
    }
  }

  const style = classNames(
    "btn",
    variant ? `btn-${variant}` : "",
    size ? `btn-${size}` : "",
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
        {...rest}
      >
        {children}
      </button>
    </NextLink>
    ) : (
    <button 
      className={style}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...rest}
    >
      {children}
    </button>
    )
  )
}
