import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import Button from "./Button"
import FadeAnimation from "./FadeAnimation"
import ClickOutside from "./ClickOutside"

export const DropdownButton = ({
  children
}) => {
  return children
}


export const DropdownItem = ({
  children,
  href,
  onClick,
  onMouseDown,
}) => {
  const style = `dropdownItem block first:rounded-t-md last:rounded-b px-3 py-1 font-semibold text-xs hover:bg-gray-100 cursor-pointer transition-colors`

  return (
    <>
      {!href ? (
        <div
          onClick={onClick}
          onMouseDown={onMouseDown}
          className={style}
        >
          {children}
        </div>
      ) : (
        <Link
          to={href}
          className={style}
        >
          {children}
        </Link>
      )}
    </>
  )
}

const Dropdown = ({
  children,
  variant,
  size,
  className,
  direction,
}) => {
  const [active, setActive] = useState(false)
  const buttonRef = useRef(null)

  const toggleDropdown = () => {
    setActive(!active)
  }

  const closeDropdown = (e) => {
    e.stopPropagation()
    // only close it if the target does not contain the button
    if (!buttonRef.current.contains(e.target)) {
      setActive(false)
    }
  }

  const button = () => {
    return children[0]
  }

  const items = () => {
    return (
      children.flat().filter((el) => el.type.name === "DropdownItem")
    )
  }

  return (
    <div className={className}>
      <div className="relative">

        <Button
          reference={buttonRef}
          variant={variant}
          size={size}
          active={active}
          onClick={toggleDropdown}
        >
          {button()}
        </Button>

        <FadeAnimation show={active}>
          <ClickOutside action={closeDropdown}>
              <div 
                onClick={closeDropdown} 
                className={`absolute ${size === "sm" ? "top-1" : "top-2"} ${direction === "left" ? "right-0" : "left-0"} w-auto whitespace-nowrap rounded shadow-md bg-white z-20`}
              >
                {items()}
              </div>
          </ClickOutside>
        </FadeAnimation>
      </div>
    </div>
  )
}

Dropdown.Button = DropdownButton
Dropdown.Item = DropdownItem


export default Dropdown
