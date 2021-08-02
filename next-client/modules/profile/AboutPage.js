const AboutPage = ({ profile }) => {
  return (
    <>
      {/* {profile.avatar ? (
      <div className="ml-10 float-right w-32 h-32 rounded overflow-hidden">
        <img className="object-cover w-full h-full" alt="Avatar" src={profile.avatar} />
      </div>
      ) : ""} */}
      <div className="prose">
        <p>{profile.description}</p>
      </div>
    </>
  )
}

export default AboutPage
