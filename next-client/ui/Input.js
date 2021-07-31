import classNames from "classnames"

export const Input = ({
  className,
  ...rest
}) => {
  return (
    <input
      className={classNames("input", className)}
      {...rest}
    />
  )
}
