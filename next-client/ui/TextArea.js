import classNames from "classnames"

export const TextArea = ({
  className,
  ...rest
}) => {
  return (
    <textarea
      className={classNames("input", className)}
      {...rest}
    />
  )
}
