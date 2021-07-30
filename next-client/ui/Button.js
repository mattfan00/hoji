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
  ...rest
}) => {
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
      {...rest}
    >
      {children}
    </button>
    )
  )
}
