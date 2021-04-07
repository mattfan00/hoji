import React from "react"
import { Link } from "react-router-dom"

const Button = ({
  children,
  type,
  variant,
  onClick,
  onMouseDown,
  className,
  lowercase,
  reference,
  disabled,
  href,
  size,
  active,
}) => {
  const style = `btn${variant === "primary" ? " btn-primary" : ""}${variant === "text" ? " btn-text" : ""}${size === "sm" ? " btn-sm" : ""}${lowercase ? " lowercase" : ""}${disabled ? " disabled" : ""}${active ? " active" : ""}${className ? ` ${className}` : ""}`

  return (
    <>
      {!href ? (
        <button
          ref={reference}
          className={style}
          onClick={onClick}
          type={type}
          onMouseDown={onMouseDown}
        >
          {children}
        </button>
      ) : (
        <Link to={href}>
          <button
            ref={reference}
            className={style}
            onClick={onClick}
            onMouseDown={onMouseDown}
          >
            {children}
          </button>
        </Link>
      )}
    </>
  )
}

export default Button
