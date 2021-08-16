import ProfileHeader from "../../components/ProfileHeader"

const AboutPage = ({ profile }) => {
  return (
    <>
      <ProfileHeader
        profile={profile}
      />

      <div className="prose">
        <p>{profile.description}</p>
      </div>
    </>
  )
}

export default AboutPage
