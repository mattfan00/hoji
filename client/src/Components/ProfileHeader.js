import React, { useState, useEffect } from "react"
import Button from "../Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DefaultProPic from "../Icons/DefaultProPic"

const ProfileHeader = ({
  name, 
  username,
  description,
}) => {
  const [bookmark, setBookmark] = useState(false)

  const toggleBookmark = () => {
    setBookmark(!bookmark)
  }


  return (
    <div className="card mb-16">
      <div className="flex items-center mb-4">
        <div className="mr-5 w-12 h-12 rounded-full overflow-hidden">
          <DefaultProPic />
        </div>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="mb-0">{name}</h3>
            <div className="leading-3">@{username}</div>
          </div>
          <Button onClick={toggleBookmark}>
            <FontAwesomeIcon icon={[bookmark ? "fas" : "far", "bookmark"]} size="lg" />
          </Button>
        </div>
      </div>
      <div>{description}</div>
    </div>
  )
}

export default ProfileHeader
