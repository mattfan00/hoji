import React from "react"

const Button = ({
  children,
  type,
  onClick,
  className
}) => {
  return (
    <button
      className={`btn${type === "primary" ? " btn-primary" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button