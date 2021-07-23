import classNames from "classnames"

export function Button({
  children,
  className = "",
}) {
  return (
    <button 
      className={classNames("btn", className)}
    >
      {children}
    </button>
  )
}
