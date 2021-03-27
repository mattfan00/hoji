import React from "react"
import { Link } from "react-router-dom"

const Button = ({
  children,
  type,
  onClick,
  onMouseDown,
  className,
  lowercase,
  reference,
  disabled,
  href,
}) => {
  const style = `btn${type === "primary" ? " btn-primary" : ""}${lowercase ? " lowercase" : ""}${disabled ? " disabled" : ""}${className ? ` ${className}` : ""}`

  return (
    <>
      {!href ? (
        <button
          ref={reference}
          className={style}
          onClick={onClick}
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