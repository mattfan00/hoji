import React from "react"

const TextArea = ({
  label,
  name,
  className,
}) => {
  return (
    <div className={`flex flex-col ${className ? className : ""}`}>
      <div className="text-xs">{label}</div>
      <textarea
        className="textarea border border-solid rounded-lg px-3 py-1.5 focus:outline-none"
        name={name}
      />
    </div>
  )
}

export default TextArea