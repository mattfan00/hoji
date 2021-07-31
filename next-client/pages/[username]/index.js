import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import ContentWrapper from "../../components/ContentWrapper"
import ProfilePage from "../../modules/profile/ProfilePage"
import { serverQuery } from "../../lib/axios"
import { useQuery } from "react-query"

const Profile = ({ profile }) => {
  const router = useRouter()
  const { username } = router.query

  const { data, isLoading: isProfileLoading } = useQuery(`/user/${username}`, {
    initialData: profile
  })

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
        <ProfilePage profile={data} />
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
