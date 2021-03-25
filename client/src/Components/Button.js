import React from "react"

const Button = ({
  children,
  type,
  onClick,
  className,
  lowercase,
  wrapper
}) => {
  return (
    <button
      ref={wrapper}
      className={`btn${type === "primary" ? " btn-primary" : ""}${lowercase ? " lowercase" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button