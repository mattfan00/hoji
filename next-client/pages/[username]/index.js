import Header from "../../components/Header"
import Entry from "../../components/Entry"

const Profile = ({ profile }) => {
  return (
    <>
      <Header profile={profile} />
      <div className="max-w-3xl mx-auto px-8">
        {profile.entries.map((entry) => (
          <Entry
            key={entry.id}
            entry={entry}
            expanded={false}
          />
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { username } = params

  const res = await fetch(`http://localhost:8080/user/${username}`)
  const data = await res.json()

  return {
    props: {
      profile: data
    }
  }
}

export default Profile
