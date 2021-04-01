import React from "react"
import Button from "./Button"
import { FcGoogle } from "react-icons/fc"
import { IconContext } from "react-icons"

const GoogleButton = ({
  onClick,
  disabled,
}) => {
  return (
    <Button
      className="flex justify-center items-center w-full mb-2 border bg-white hover:bg-white"
      onClick={onClick}
      disabled={disabled}
    >
      <IconContext.Provider value={{ className: "mr-2" }} ><FcGoogle size={19} /></IconContext.Provider>
      Continue with Google
    </Button>
  )
}

export default GoogleButton