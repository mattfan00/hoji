import React from "react"

const Button = ({ children, type }) => {
  return (
    // <button className="bg-primary text-white btn">
    <button
      className={`btn ${type == "primary" ? "btn-primary" : ""}
      `}
    >
      {children}
    </button>
  )
}

export default Button