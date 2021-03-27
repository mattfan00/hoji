import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import Button from "./Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  const style = `block first:rounded-t-lg last:rounded-b-lg px-4 py-1.5 font-semibold text-xs hover:bg-gray-100 cursor-pointer transition-colors`

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
  type,
  size,
  className,
}) => {
  const [active, setActive] = useState(false)
  const buttonRef = useRef(null)

  const toggleDropdown = (e) => {
    setActive(!active)
  }

  const closeDropdown = (e) => {
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
      children.flat().map((el) => {
        if (el.type.name === "DropdownItem") return el
      })
    )
  }

  return (
    <div className={className}>
      <Button
        reference={buttonRef}
        type={type}
        size={size}
        active={active}
        onClick={toggleDropdown}
      >
        {button()}
      </Button>


      <FadeAnimation show={active}>
        <ClickOutside action={closeDropdown}>
          <div className="relative">
            <div onClick={closeDropdown} className="absolute top-2 w-auto whitespace-nowrap rounded-lg shadow-md bg-white">
              {items()}
            </div>
          </div>
        </ClickOutside>
      </FadeAnimation>
    </div>
  )
}

Dropdown.Button = DropdownButton
Dropdown.Item = DropdownItem


export default Dropdown