import Head from "next/head"
import Header from "../../components/Header"
import PageWrapper from "../../components/PageWrapper"
import Entry from "../../components/Entry"
import { fetcher } from "../../lib/query"

const Profile = ({ profile }) => {
  return (
    <>
      <Head>
        <title>{profile.name} | hoji</title>
      </Head>
      <Header profile={profile} />
      <PageWrapper>
        {profile.entries.map((entry) => (
          <Entry
            key={entry.id}
            entry={entry}
            expanded={false}
          />
        ))}
      </PageWrapper>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { username } = params

  const profile = await fetcher({ queryKey: `/user/${username}` })

  return {
    props: {
      profile
    }
  }
}

export default Profile
