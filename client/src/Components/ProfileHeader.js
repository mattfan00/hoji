import React, { useState, useContext, useEffect } from "react"
import { useMutation } from "react-query"
import Button from "../Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DefaultProPic from "../Icons/DefaultProPic"
import { AuthContext } from "../Context/AuthContext"
import axios from "axios"

const ProfileHeader = ({
  profile,
  isBookmark,
  expanded,
}) => {
  const createMutation = useMutation((body) => axios.post(`/bookmark`, body))
  const deleteMutation = useMutation(() => axios.delete(`/bookmark/${profile.id}`))

  const [bookmark, setBookmark] = useState(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (isBookmark != null) {
      setBookmark(isBookmark)
    }
  }, [isBookmark])

  const toggleBookmark = async () => {
    setBookmark(!bookmark)

    if (!bookmark) { // if not already a bookmark
      createMutation.mutate({ bookmark_user_id: profile.id })
    } else {
      deleteMutation.mutate()
    }
  }

  return (
    <div className="card">
      <div className="flex items-center">
        <div className="mr-4 w-12 h-12 rounded-full overflow-hidden">
          {profile.avatar ? (
            <img className="object-cover w-full h-full" alt="Avatar" src={profile.avatar} />
          ) : (
            <DefaultProPic />
          )}
        </div>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="mb-0">{profile.name}</h3>
            <div className="leading-4">{profile.username}</div>
          </div>
          {user && user.username !== profile.username ? (
          <Button onClick={toggleBookmark}>
            <FontAwesomeIcon icon={[bookmark ? "fas" : "far", "bookmark"]} />
          </Button>
          ) : ""}
        </div>
      </div>

      {profile.description ? (
      <div className="mt-4">{profile.description}</div>
      ): ""}

      {expanded && (profile.location || profile.website) ? (
      <div className="mt-4">
        {profile.location ? (
        <div>
          <FontAwesomeIcon className="fa-fw mr-2" icon="map-marker-alt" size="sm" />
          <span>{profile.location}</span>
        </div>
        ): ""}
        {profile.website ? (
        <div>
          <FontAwesomeIcon className="fa-fw mr-2" icon="link" size="sm" />
          <a className="color" href={profile.website} target="_blank">{profile.website}</a>
        </div>
        ): ""}
      </div>
      ) : ""}
    </div>
  )
}

export default ProfileHeader
