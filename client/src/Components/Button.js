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
  const style = `btn${variant ? ` btn-${variant}` : ""}${size === "sm" ? " btn-sm" : ""}${lowercase ? " lowercase" : ""}${disabled ? " disabled" : ""}${active ? " active" : ""}${className ? ` ${className}` : ""}`

  const handleClick = (e) => {
    if (onClick) {
      e.stopPropagation()
      onClick()
    }
  }

  return (
    <>
      {!href ? (
        <button
          ref={reference}
          className={style}
          onClick={handleClick}
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
            //onClick={handleClick}
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
