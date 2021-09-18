import React from "react"
import classNames from "classnames"

export const ListItem = React.forwardRef(({
  children,
  className,
  ...rest
}, ref) => {
  return (
    <div 
      ref={ref}
      className={classNames("border py-3 px-5 -mb-px first:rounded-t-md last:rounded-b-md", className)}
      {...rest}
    >
      {children}
    </div>
  )
})

export const ListGroup = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div 
      className={classNames("rounded-md", className)}
      {...rest}
    >
      {children}
    </div>
  )
}

ListGroup.Item = ListItem

