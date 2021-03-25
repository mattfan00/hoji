import React, { useState } from "react"
import { Link } from "react-router-dom"
import Button from "./Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FadeAnimation from "./FadeAnimation"

export const DropdownItem = ({
  children,
  to
}) => {
  return (
    <div className="px-4 py-1.5 font-semibold text-xs hover:bg-gray-100 cursor-pointer transition-colors">
      <Link to={to}>{children}</Link>
    </div>
  )
}

const Dropdown = ({
  children,
  title,
  icon
}) => {
  const [active, setActive] = useState(false)

  const toggleActive = () => {
    setActive(!active)
  }

  return (
    <div>
      <Button
        className={active ? "active" : ""}
        onClick={toggleActive}
      >
        {icon ? <FontAwesomeIcon className="mr-1.5" icon={icon} /> : ""}
        {title}
      </Button>


      <FadeAnimation show={active}>
        <div className="relative">
          <div className="absolute py-1 top-2 w-auto whitespace-nowrap rounded-lg shadow-md">
            {children}
          </div>
        </div>
      </FadeAnimation>
    </div>
  )
}

Dropdown.Item = DropdownItem


export default Dropdown