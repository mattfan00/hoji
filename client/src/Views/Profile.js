import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProfileHeader from "../Components/ProfileHeader"
import Entry from "../Components/Entry"
import axios from "axios"

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const { username } = useParams()

  useEffect(() => {
    const getProfile = async () => {
      const profileResult = await axios.get(`/user/${username}`)
      console.log(profileResult.data)

      setProfile(profileResult.data)
    }

    getProfile()
  }, [])

  return (
    <div>
      <ProfileHeader 
        name={profile?.name}
        username={profile?.username}
        description={profile?.details.description}
      />

      <div>
        {profile?.entries.map(({
          _id, 
          author, 
          created,
          type, 
          title,
          description,
          content,
          photos,
        }) => (
          <Entry
            key={_id}
            author={author}
            created={created}
            type={type}
            title={title}
            description={description}
            content={content}
            photos={photos}
          />
        ))}

        <Entry
          key={1}
          author="mattfan00"
          created="Mar 21, 2021"
          type="thought"
          content="why is collaborative work so hard"
        />
        <Entry
          key={2}
          author="mattfan00"
          created="Mar 21, 2021"
          type="thought"
          content="graduation is coming up! excited for my new life after school, but not excited to leave my old one"
        />
        <Entry
          key={3}
          author="mattfan00"
          created="Mar 21, 2021"
          type="post"
          title="one year"
          description="I first started coding back in 8th grade when I took a programming course offered by my school and learned Visual Basic. After that I learned some HTML, CSS, and Javascript (copy and pasting from Stack Overflow) in highschool..."
        />
        <Entry
          key={4}
          author="mattfan00"
          created="Mar 21, 2021"
          type="gallery"
          content="food excursions in nyc"
          photos={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
        <Entry
          key={5}
          author="mattfan00"
          created="Mar 21, 2021"
          type="post"
          title="one year"
          description="I first started coding back in 8th grade when I took a programming course offered by my school and learned Visual Basic. After that I learned some HTML, CSS, and Javascript (copy and pasting from Stack Overflow) in highschool..."
        />
        <Entry
          key={6}
          author="mattfan00"
          created="Mar 21, 2021"
          type="thought"
          content="graduation is coming up! excited for my new life after school, but not excited to leave my old one"
        />
        <Entry
          key={7}
          author="mattfan00"
          created="Mar 21, 2021"
          type="gallery"
          content="food excursions in nyc"
          photos={[1, 2, 3, 4]}
        />
      </div>
    </div>
  )
}

export default Profile
