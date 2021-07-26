import classNames from "classnames"

export const Button = ({
  children,
  className = "",
}) => {
  return (
    <button 
      className={classNames("btn", className)}
    >
      {children}
    </button>
  )
}
