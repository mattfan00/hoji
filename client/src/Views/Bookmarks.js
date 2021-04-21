import React from "react"
import { useQuery } from "react-query"
import ProfileHeader from "../Components/ProfileHeader"

const Bookmarks = () => {
  const { data: bookmarks, isLoading } = useQuery(`/bookmark`)
  
  if (isLoading) {
    return ""
  }

  return (
    <>
      <h2 className="mb-4">Bookmarks</h2>
      {bookmarks.length !== 0 ? (
        bookmarks.map(({ bookmark_user: user }) => (
          <div className="mb-4" key={user.id}>
            <ProfileHeader
              id={user.id}
              name={user.name}
              username={user.username}
              description={user.description}
              isBookmark={true}
            />
          </div>
        ))
      ) : (
        <div>You haven't bookmarked any profiles yet!</div>
      )}

    </>
  )
}

export default Bookmarks
