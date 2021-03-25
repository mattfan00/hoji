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
  return (
    <button
      ref={wrapper}
      className={`btn${type === "primary" ? " btn-primary" : ""}${lowercase ? " lowercase" : ""}${disabled ? " disabled" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {href ? (
        <Link to={href}>{children}</Link>
      ) : (
        children
      )}
    </button>
  )
}

export default Button