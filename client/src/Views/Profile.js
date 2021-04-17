import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Link, useParams } from "react-router-dom"
import ProfileHeader from "../Components/ProfileHeader"
import Entry from "../Components/Entry"
import axios from "axios"

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const { username } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getProfile = async () => {
      const profileResult = await axios.get(`/user/${username}`)
      console.log(profileResult.data)

      setProfile(profileResult.data)
    }

    getProfile()
  }, [])

  const handleDelete = (entryId) => {
    const newEntries = profile.entries.filter((entry) => entry.id != entryId)
    setProfile({...profile, entries: newEntries})
  }

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
              user={profile?.username}
              createdAt={created_at}
              type={type}
              title={title}
              description={description}
              content={content}
              photos={photos}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
