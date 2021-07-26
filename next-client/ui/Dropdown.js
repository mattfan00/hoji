import { Menu } from "@headlessui/react"
import classNames from "classnames"

export const DropdownButton = ({ 
  children, 
  className = "" 
}) => {
  return (
    <Menu.Button 
      className={classNames("btn", className)}
    >
      {children}
    </Menu.Button>
  )
}

export const DropdownItems = ({ 
  children,
  direction = "right",
  className = "",
}) => {
  return (
    <Menu.Items 
      className={classNames(
        "absolute mt-2 w-auto whitespace-nowrap rounded shadow bg-white z-20 px-1 py-1",
        { "left-0": direction === "right", "right-0": direction === "left" },
        className
      )}
    >
      {children}
    </Menu.Items>
  )
}

export const DropdownItem = ({ children }) => {
  const style = "block px-4 py-1.5 font-semibold text-xs hover:bg-gray-100 rounded cursor-pointer transition-colors"

  return (
    <Menu.Item>
      <div className={style}>
        {children}
      </div>
    </Menu.Item>
  )
}

export const Dropdown = ({
  children,
  className = "",
}) => {
  return (
    <div className={classNames("inline-block", className)}>
      <Menu as="div" className="relative">
        {children}
      </Menu>
    </div>
  )
}

Dropdown.Button = DropdownButton
Dropdown.Items = DropdownItems
Dropdown.Item = DropdownItem
