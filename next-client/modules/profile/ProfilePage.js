import Entry from "../../components/Entry"
import { useQuery } from "react-query"
import { useAuth } from "../../contexts/auth"

const ProfilePage = ({ profile }) => {
  const { isLoading, user } = useAuth()

  /*
  const { data: bookmarks, isLoading: isBookmarksLoading } = useQuery(`/bookmark`, {
    enabled: (!isLoading && user) ? true : false
  })
  */

  const checkBookmark = () => {
    return bookmarks?.find((bookmark) => (
      profile.id === bookmark.bookmark_user.id
    )) ? true : false
  } 

  return (
    <>
      {profile.entries?.map((entry) => (
        <Entry
          key={entry.id}
          entry={entry}
          author={profile}
          expanded={false}
        />
      ))}
    </>
  )
}

export default ProfilePage
