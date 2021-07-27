import Head from "next/head"
import Header from "../../components/Header"
import ContentWrapper from "../../components/ContentWrapper"
import { serverQuery } from "../../lib/axios"

const About = ({ profile }) => {
  return (
    <>
      <Head>
        <title>{profile.name} | hoji</title>
      </Head>

      <Header profile={profile} />

      <ContentWrapper>

        {profile.avatar ? (
        <div className="ml-10 float-right w-32 h-32 rounded overflow-hidden">
          <img className="object-cover w-full h-full" alt="Avatar" src={profile.avatar} />
        </div>
        ) : ""}
        <div>
          <h2>About</h2>
          <p>{profile.description}</p>
        </div>
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
