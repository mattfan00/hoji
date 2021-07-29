import { useState, useEffect } from "react"
import { useMutation } from "react-query"
import { useAuth } from "../contexts/auth"
import NextLink from "../components/NextLink"
import { clientQuery } from "../lib/axios"

const ProfileHeader = ({ 
  profile,
  isBookmark
}) => {
  const createMutation = useMutation((body) => clientQuery().post(`/bookmark`, body))
  const deleteMutation = useMutation(() => clientQuery().delete(`/bookmark/${profile.id}`))

  const [bookmark, setBookmark] = useState(null)
  const { user } = useAuth()

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
    <div className="pt-24">
      <div className="flex flex-col">
        <h1>{profile.name}</h1>
        <div className="pt-2 text-gray-500 flex">
          <NextLink 
            href={`/${profile.username}`}
            className="mr-4"
          >Blog</NextLink>
          <NextLink 
            href={`/${profile.username}/about`}
            className="mr-4"
          >About</NextLink>

          {/* user && user.username !== profile.username ? (
            <>
              <div className="mr-4 font-thin">•</div>
              {bookmark ? (
              <div 
                className="cursor-pointer"
                onClick={toggleBookmark}
              >Following</div>
              ) : (
              <div 
                className="cursor-pointer"
                onClick={toggleBookmark}
              >Follow</div>
              )}
            </>
          ) : "" */}
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
