import React, { useState, useContext } from "react"
import Button from "../Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DefaultProPic from "../Icons/DefaultProPic"
import { AuthContext } from "../Context/AuthContext"

const ProfileHeader = ({
  name, 
  username,
  description,
}) => {
  const [bookmark, setBookmark] = useState(false)
  const { user } = useContext(AuthContext)

  const toggleBookmark = () => {
    setBookmark(!bookmark)
  }

  return (
    <div className="card mb-16">
      <div className="flex items-center mb-4">
        <div className="mr-4 w-12 h-12 rounded-full overflow-hidden">
          <DefaultProPic />
        </div>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="mb-0">{name}</h3>
            <div className="leading-3">@{username}</div>
          </div>
          {user && user.username !== username ? (
          <Button onClick={toggleBookmark}>
            <FontAwesomeIcon icon={[bookmark ? "fas" : "far", "bookmark"]} size="lg" />
          </Button>
          ) : ""}
        </div>
      </div>
      <div>{description}</div>
    </div>
  )
}

export default ProfileHeader
