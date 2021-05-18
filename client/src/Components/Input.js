import React from "react"

const Input = ({
  label,
  reference,
  name,
  className,
  autoCompleteOff,
  autoFocus,
  placeholder,
  type,
  required,
  value,
  onChange,
  noEdit,
  minLength,
  maxLength,
}) => {
  return (
    <div className={`flex flex-col ${className ? className : ""}`}>
      {label ? (
      <div className="text-xs">
        {label}
        {required ? <span className="text-red-500 ml-0.5">*</span> : ""}
      </div>
      ) : ""}

      {!noEdit ? (
        <input
          className="input"
          ref={reference}
          name={name}
          autoComplete={autoCompleteOff ? "off" : ""}
          autoFocus={autoFocus}
          placeholder={placeholder}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
        />
      ) : (
        <div>{value}</div>
      )}
    </div>
  )
}

export default Input
