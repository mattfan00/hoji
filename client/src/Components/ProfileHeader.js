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
    <div>
      <div className="flex justify-between items-center">
        <h1 className="mb-0">{profile.name}</h1>
        {user && user.username !== profile.username ? (
        <Button onClick={toggleBookmark}>
          <FontAwesomeIcon icon={[bookmark ? "fas" : "far", "bookmark"]} />
        </Button>
        ) : ""}
      </div>

      {profile.description || profile.location || profile.website ? (
      <div className="mt-2 mb-20">
        {profile.description ? (
        <div className="text-gray-400 mb-4">{profile.description}</div>
        ): ""}


        {/*
        {profile.location || profile.website ? (
        <div className="flex flex-wrap">
          {profile.location ? (
          <span className="mr-4">
            <FontAwesomeIcon className="fa-fw mr-1" icon="map-marker-alt" size="sm" />
            <span>{profile.location}</span>
          </span>
          ): ""}
          {profile.website ? (
          <span>
            <FontAwesomeIcon className="fa-fw mr-1" icon="link" size="sm" />
            <a className="color" href={profile.website} target="_blank">{profile.website}</a>
          </span>
          ): ""}
        </div>
        ) : ""}
        */}

      </div>
      ) : ""}
    </div>
  )
}

export default ProfileHeader
