import React from "react"

const Input = ({
  label,
  name,
  className,
  autocompleteOff,
  placeholder,
  type,
  required,
  value,
  onChange,
}) => {

  return (
    <div className={`flex flex-col ${className ? className : ""}`}>
      {label ? (
      <div className="text-xs">
        {label}
        {required ? <span className="text-red-500 ml-0.5">*</span> : ""}
      </div>
      ) : ""}
      <input
        className="input"
        name={name}
        autoComplete={autocompleteOff ? "off" : ""}
        placeholder={placeholder}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input