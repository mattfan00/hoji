import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Nav = () => {
  return (
    <div className="absolute bottom-10 left-8">
      <button className="rounded-xl px-3 py-2 border border-solid focus:outline-none bg-white">
        <FontAwesomeIcon icon="bars" size="sm" />
      </button>
    </div>
  )
}

export default Nav