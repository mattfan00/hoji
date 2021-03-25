import React from "react"

const Button = ({
  children,
  type,
  onClick,
  className,
  lowercase,
  wrapper,
  disabled,
}) => {
  return (
    <button
      ref={wrapper}
      className={`btn${type === "primary" ? " btn-primary" : ""}${lowercase ? " lowercase" : ""}${disabled ? " disabled" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button