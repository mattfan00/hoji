import React from "react"

const Error = ({
  children,
  className,
  show,
}) => {
  const style = `px-3 py-2 rounded-md bg-red-100 border border-red-300 text-xs ${className ? className : ""}`

  return show ? (
    <div className={style}>
      {children}
    </div>
    ) : ""
}

export default Error
