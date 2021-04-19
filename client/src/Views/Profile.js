import React from "react"
import { useQuery } from "react-query"
import { useParams, useHistory } from "react-router-dom"
import ProfileHeader from "../Components/ProfileHeader"
import Entry from "../Components/Entry"

const Profile = () => {
  const { username } = useParams()
  const history = useHistory()

  const { data: profile } = useQuery(`/user/${username}`)

  const handleClick = (e, id) => {
    if (e.target.tagName !== "A") {
      history.push(`/entry/${id}`)
    }
  }

  const sortedEntries = () => {
    return profile?.entries?.sort((a, b) => {
      const aDate = new Date(a.created_at)
      const bDate = new Date(b.created_at)
      return bDate - aDate
    })
  }

  return (
    <div>
      <ProfileHeader 
        name={profile?.name}
        avatar={profile?.avatar}
        username={profile?.username}
        description={profile?.description}
      />

      <div className="mt-16">
        {sortedEntries()?.map(({
          id, 
          created_at,
          type, 
          title,
          description,
          content,
          photos,
        }) => (
          <div 
            className="cursor-pointer" 
            onClick={(e) => handleClick(e, id)} 
            key={id}
          >
            <Entry
              id={id}
              username={profile?.username}
              createdAt={created_at}
              type={type}
              title={title}
              description={description}
              content={content}
              photos={photos}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
