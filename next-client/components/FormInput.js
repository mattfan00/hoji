import { useField } from "formik"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { Input } from "../ui"

const FormInput = ({
  label,
  name,
  className,
  ...rest
}) => {
  const [field, meta] = useField(name)

  return (
    <div className={classNames("flex flex-col", className)}>
      {label ? (
      <div className="text-sm mb-1 font-semibold">
        <label htmlFor={name}>{label}</label>
      </div>
      ) : ""}

      <Input
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

export default FormInput
