import React from "react"

const Button = ({
  children,
  type,
  onClick,
  className,
  lowercase
}) => {
  return (
    <button
      className={`btn${type === "primary" ? " btn-primary" : ""}${lowercase ? " lowercase" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button