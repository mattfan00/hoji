import Head from "next/head"
import Header from "../../components/Header"
import ContentWrapper from "../../components/ContentWrapper"
import AboutPage from "../../modules/profile/AboutPage"
import { serverQuery } from "../../lib/axios"

const About = ({ profile }) => {
  return (
    <>
      <Head>
        <title>{profile.name} | hoji</title>
      </Head>

      <Header />

      

      <ContentWrapper>
        <AboutPage profile={profile} />
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

export default About
