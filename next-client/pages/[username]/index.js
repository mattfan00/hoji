import Head from "next/head"
import Header from "../../components/Header"
import ContentWrapper from "../../components/ContentWrapper"
import Entry from "../../components/Entry"
import { serverQuery } from "../../lib/axios"

const Profile = ({ profile }) => {
  return (
    <>
      <Head>
        <title>{profile.name} | hoji</title>
      </Head>

      <Header profile={profile} />

      <ContentWrapper>
        {profile.entries?.map((entry) => (
          <Entry
            key={entry.id}
            entry={entry}
            expanded={false}
          />
        ))}
      </ContentWrapper>
    </>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const { username } = params

  //const user = await getCurrentUser(req)
  const { data: profile } = await serverQuery(req).get(`/user/${username}`)

  return {
    props: {
      profile,
    }
  }
}

export default Profile
