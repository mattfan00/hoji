import React, { useState, useContext } from "react"
import { useMutation } from "react-query"
import { Link } from "react-router-dom"
import Button from "../Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DefaultProPic from "../Icons/DefaultProPic"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"

const ProfileHeader = ({
  id,
  name, 
  username,
  avatar,
  description,
  isBookmark
}) => {
  const createMutation = useMutation((body) => axios.post(`/bookmark`, body))
  const deleteMutation = useMutation(() => axios.delete(`/bookmark/${id}`))

  const [bookmark, setBookmark] = useState(isBookmark)
  const { user } = useContext(AuthContext)

  const toggleBookmark = () => {
    setBookmark(!bookmark)

    if (!bookmark) { // if not already a bookmark
      createMutation.mutate({ bookmark_user_id: id })
    } else {
      deleteMutation.mutate()
    }
  }

  return (
    <div className="card">
      <div className="flex items-center">
        <div className="mr-4 w-12 h-12 rounded-full overflow-hidden">
          {avatar ? (
            <img className="object-cover w-full h-full" src={avatar} />
          ) : (
            <DefaultProPic />
          )}
        </div>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="mb-0">{name}</h3>
            <div className="leading-4">@{username}</div>
          </div>
          {user && user.username !== username ? (
          <Button onClick={toggleBookmark}>
            <FontAwesomeIcon icon={[bookmark ? "fas" : "far", "bookmark"]} />
          </Button>
          ) : ""}
        </div>
      </div>
      {description ? (
      <div className="mt-4">{description}</div>
      ): ""}
      {isBookmark}
    </div>
  )
}

export default ProfileHeader
