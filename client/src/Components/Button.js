import React from "react"
import { Link } from "react-router-dom"

const Button = ({
  children,
  type,
  onClick,
  className,
  lowercase,
  wrapper,
  disabled,
  href,
}) => {
  const style = `btn${type === "primary" ? " btn-primary" : ""}${lowercase ? " lowercase" : ""}${disabled ? " disabled" : ""}${className ? ` ${className}` : ""}`

  return (
    <>
      {!href ? (
        <button
          ref={wrapper}
          className={style}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <Link to={href}>
          <button
            ref={wrapper}
            className={style}
            onClick={onClick}
          >
            {children}
          </button>
        </Link>
      )}
    </>
  )
}

export default Button