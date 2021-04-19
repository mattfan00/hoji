import React from "react"

const Error = ({
  className,
  error,
}) => {
  const style = `px-3 py-2 rounded-md bg-red-100 border border-red-300 text-xs ${className ? className : ""}`

  const message = () => {
    return error.response.data.message
  }

  return error ? (
    <div className={style}>
      {message()}
    </div>
    ) : ""
}

export default Error
