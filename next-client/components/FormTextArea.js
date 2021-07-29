import { useField } from "formik"
import { TextArea } from "../ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

const FormTextArea = ({
  label,
  name,
  className,
  ...rest
}) => {
  const [field, meta] = useField(name)

  return (
    <div className={classNames("flex flex-col", className)}>
      {label ? (
      <div className="text-xs">
        <label htmlFor={name}>{label}</label>
      </div>
      ) : ""}

      <TextArea
        {...rest}
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

export default FormTextArea
