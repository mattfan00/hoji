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
