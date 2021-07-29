import Head from "next/head"
import Header from "../../components/Header"
import ContentWrapper from "../../components/ContentWrapper"
import ProfilePage from "../../modules/profile/ProfilePage"
import { serverQuery } from "../../lib/axios"

const Profile = ({ profile }) => {
  return (
    <>
      <Head>
        <title>{profile.name} | hoji</title>
      </Head>

      <Header 
        profile={profile} 
        //isBookmark={checkBookmark()}
      />

      <ContentWrapper>
        <ProfilePage profile={profile} />
      </ContentWrapper>
    </>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const { username } = params

  const { data: profile } = await serverQuery(req).get(`/user/${username}`)

  return {
    props: {
      profile,
    }
  }
}

export default Profile
