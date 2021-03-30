import React from "react"

const Input = ({
  label,
  name,
  className,
  autocompleteOff,
}) => {

  return (
    <div className={`flex flex-col ${className ? className : ""}`}>
      <div className="text-xs">{label}</div>
      <input
        className="input"
        name={name}
        autoComplete={autocompleteOff ? "off" : ""}
      />
    </div>
  )
}

export default Input