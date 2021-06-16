import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Spinner = () => {
  return (
    <FontAwesomeIcon 
      className="animate-spin text-primary"
      icon="circle-notch" 
      size="lg" 
    />
  )
}

export default Spinner
