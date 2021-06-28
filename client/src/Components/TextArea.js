import React from "react"
import { useField } from "formik"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const TextArea = ({
  label,
  name,
  className,
  minLength,
  maxLength,
}) => {
  const [field, meta] = useField(name)

  return (
    <div className={`flex flex-col ${className ? className : ""}`}>
      {label ? (
      <div className="text-xs">
        <label htmlFor={name}>{label}</label>
      </div>
      ) : ""}

      <textarea
        className="input"
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        {...field}
      />

      {meta.touched && meta.error ? (
        <div className="mt-1 text-xs text-red-400">
          <FontAwesomeIcon
            className="mr-2"
            icon="exclamation-triangle"
            size="sm"
          />
          {meta.error}
        </div>
       ) : ""}
    </div>
  )
}

export default TextArea
