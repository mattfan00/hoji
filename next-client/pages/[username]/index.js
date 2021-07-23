import Header from "../../components/Header"
import Entry from "../../components/Entry"
import { fetcher } from "../../lib/query"

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

  const profile = await fetcher({ queryKey: `/user/${username}` })

  return {
    props: {
      profile
    }
  }
}

export default Profile
