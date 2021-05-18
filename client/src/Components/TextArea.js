import React from "react"

const TextArea = ({
  label,
  name,
  className,
  value,
  onChange,
  minLength,
  maxLength,
}) => {
  return (
    <div className={`flex flex-col ${className ? className : ""}`}>
      <div className="text-xs">{label}</div>
      <textarea
        className="textarea border border-solid rounded-md px-3 py-1.5 focus:outline-none"
        name={name}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  )
}

export default TextArea
