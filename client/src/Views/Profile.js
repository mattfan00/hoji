import React, { useContext } from "react"
import { useQuery } from "react-query"
import { useParams, useHistory } from "react-router-dom"
import ProfileHeader from "../Components/ProfileHeader"
import Entry from "../Components/Entry/Entry"
import { AuthContext } from "../Context/AuthContext"

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

  const sortedEntries = () => {
    return profile?.entries?.sort((a, b) => {
      const aDate = new Date(a.created_at)
      const bDate = new Date(b.created_at)
      return bDate - aDate
    })
  }

  const checkBookmark = () => {
    return bookmarks?.find((bookmark) => (
      profile.id === bookmark.bookmark_user.id
    )) ? true : false
  } 

  if (isProfileLoading || isBookmarksLoading) {
    return ""
  }

  return (
    <>
      <ProfileHeader 
        id={profile.id}
        name={profile.name}
        avatar={profile.avatar}
        username={profile.username}
        description={profile.description}
        website={profile.website}
        isBookmark={checkBookmark()}
        expanded={true}
      />

      <div className="mt-10">
        {sortedEntries()?.map(({
          id, 
          created_at,
          type, 
          title,
          description,
          content,
          photos,
        }) => (
          <Entry
            id={id}
            onClick={(e) => handleClick(e, id)}
            username={profile.username}
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
