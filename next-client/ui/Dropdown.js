import { Menu } from "@headlessui/react"
import NextLink from "../components/NextLink"
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
        "absolute mt-2 w-auto whitespace-nowrap rounded shadow bg-white z-20 px-1 py-1 focus:outline-none",
        { "left-0": direction === "right", "right-0": direction === "left" },
        className
      )}
    >
      {children}
    </Menu.Items>
  )
}

export const DropdownItem = ({ 
  children,
  href,
  onClick,
}) => {
  const style = "block px-4 py-1.5 font-semibold text-xs rounded cursor-pointer transition-colors"

  return (
    <Menu.Item>
      {({ active }) => (
        href ? (
          <NextLink 
            href={href} 
            className={classNames(style, { "bg-gray-100": active })}
          >
            {children}
          </NextLink>
        ) : (
          <div
            onClick={onClick}
            className={classNames(style, { "bg-gray-100": active })}
          >
            {children}
          </div>
        )
      )}
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
