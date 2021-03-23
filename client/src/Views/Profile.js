import React from "react"
import ProfileHeader from "../Components/ProfileHeader"
import Entry from "../Components/Entry"

const Profile = () => {
  return (
    <div>
      <ProfileHeader />

      <div className="p-4">
        <Entry
          username="mattfan00"
          date="Mar 21, 2021"
          type="thought"
          content="why is collaborative work so hard"
        />
        <Entry
          username="mattfan00"
          date="Mar 21, 2021"
          type="thought"
          content="graduation is coming up! excited for my new life after school, but not excited to leave my old one"
        />
        <Entry
          username="mattfan00"
          date="Mar 21, 2021"
          type="post"
          title="one year"
          description="I first started coding back in 8th grade when I took a programming course offered by my school and learned Visual Basic. After that I learned some HTML, CSS, and Javascript (copy and pasting from Stack Overflow) in highschool..."
        />
        <Entry
          username="mattfan00"
          date="Mar 21, 2021"
          type="gallery"
          caption="food excursions in nyc"
          photos={[1, 2, 3]}
        />
      </div>
    </div>
  )
}

export default Profile
