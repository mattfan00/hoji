import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import Button from "./Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FadeAnimation from "./FadeAnimation"
import ClickOutside from "./ClickOutside"

export const DropdownItem = ({
  children,
  to
}) => {
  return (
    <Link
      to={to}
      className="block first:rounded-t-lg last:rounded-b-lg px-4 py-1.5 font-semibold text-xs hover:bg-gray-100 cursor-pointer transition-colors"
    >
      {children}
    </Link>
  )
}

const Dropdown = ({
  children,
  title,
  icon
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

  return (
    <div>
      <Button
        wrapper={buttonRef}
        className={active ? "active" : ""}
        onClick={toggleDropdown}
      >
        {icon ? <FontAwesomeIcon className="mr-1.5" icon={icon} /> : ""}
        {title}
      </Button>


      <FadeAnimation show={active}>
        <ClickOutside action={closeDropdown}>
          <div className="relative">
            <div onClick={closeDropdown} className="absolute top-2 w-auto whitespace-nowrap rounded-lg shadow-md bg-white">
              {children}
            </div>
          </div>
        </ClickOutside>
      </FadeAnimation>
    </div>
  )
}

Dropdown.Item = DropdownItem


export default Dropdown