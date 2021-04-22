import React from "react"
import { useHistory } from "react-router-dom"
import { useQuery } from "react-query"
import ProfileHeader from "../Components/ProfileHeader"
import axios from "axios"

const Bookmarks = () => {
  // uses a separate query key so that query does not refetch
  // when clicking on a profile that was removed as a bookmark
  const { data: bookmarks, isLoading } = useQuery(
    [`/bookmark`, { page: "full" }], 
    async ({ queryKey }) => {
      const { data } = await axios.get(queryKey[0])
      return data
    }
  )

  const history = useHistory()
  
  const handleClick = (username) => {
    history.push(`/${username}`)
  }

  const sortedBookmarks = () => {
    return bookmarks?.sort((a, b) => {
      const aDate = new Date(a.created_at)
      const bDate = new Date(b.created_at)
      return bDate - aDate
    })
  }

  if (isLoading) {
    return ""
  }

  return (
    <>
      <h2 className="mb-4">Bookmarks</h2>
      {bookmarks.length !== 0 ? (
        sortedBookmarks().map(({ bookmark_user: user }) => (
          <div className="mb-4 cursor-pointer" onClick={() => handleClick(user.username)} key={user.id}>
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
