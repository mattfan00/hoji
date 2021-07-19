import React, { useContext } from "react"
import { useQuery } from "react-query"
import { useParams, useHistory } from "react-router-dom"
import ProfileHeader from "../Components/ProfileHeader"
import Entry from "../Components/Entry/Entry"
import { AuthContext } from "../Context/AuthContext"
import NotFound from "../Components/NotFound"
import Spinner from "../Icons/Spinner"

const Profile = () => {
  const { username } = useParams()
  const { loading, user } = useContext(AuthContext)
  const history = useHistory()

  const { data: profile, isLoading: isProfileLoading } = useQuery(`/user/${username}`)
  const { data: bookmarks, isLoading: isBookmarksLoading } = useQuery(`/bookmark`, {
    enabled: (!loading && user) ? true : false
  })

  const handleClick = (e, id) => {
    history.push(`/entry/${id}`)
  }

  const checkBookmark = () => {
    return bookmarks?.find((bookmark) => (
      profile.id === bookmark.bookmark_user.id
    )) ? true : false
  } 

  if (isProfileLoading || isBookmarksLoading) {
    return <></>
  }

  if (!isProfileLoading && !profile) {
    return <NotFound />
  }

  return (
    <>
      {/*
      <img 
        className="mb-5 rounded-xl"
        src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F493f1a92-2750-4f44-904d-b38025d2739e%2FFrame_575.png?table=block&id=ed456500-6f19-4a2f-be7d-3a4965d7b15a&spaceId=e12b42ac-4e54-476f-a4f5-7d6bdb1e61e2&width=2380&userId=54acc7c8-9648-4353-a287-d051a5ff353b&cache=v2"
      />
      */}

      <ProfileHeader
        profile={profile}
        isBookmark={checkBookmark()}
      />

      <div className="mt-8">
        {profile.entries?.map(({
          id, 
          created_at,
          type, 
          title,
          description,
          content,
          photos,
        }) => (
          <Entry
            key={id}
            id={id}
            onClick={(e) => handleClick(e, id)}
            author={profile}
            createdAt={created_at}
            type={type}
            title={title}
            description={description}
            content={content}
            photos={photos}
          />
        ))}
      </div>
    </>
  )
}

export default Profile
