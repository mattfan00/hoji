import React from "react"

const Input = ({
  label,
  reference,
  name,
  className,
  autocompleteOff,
  autoFocus,
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
        ref={reference}
        name={name}
        autoComplete={autocompleteOff ? "off" : ""}
        autoFocus={autoFocus}
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
