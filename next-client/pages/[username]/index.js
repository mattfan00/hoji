import Head from "next/head"
import Header from "../../components/Header"
import ContentWrapper from "../../components/ContentWrapper"
import Entry from "../../components/Entry"
import { serverQuery } from "../../lib/axios"
import { useQuery } from "react-query"
import { useAuth } from "../../contexts/auth"

const Profile = ({ profile }) => {
  const { isLoading, user } = useAuth()

  /*
  const { data: bookmarks, isLoading: isBookmarksLoading } = useQuery(`/bookmark`, {
    enabled: (!isLoading && user) ? true : false
  })
  */

  const checkBookmark = () => {
    return bookmarks?.find((bookmark) => (
      profile.id === bookmark.bookmark_user.id
    )) ? true : false
  } 

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

  const { data: profile } = await serverQuery(req).get(`/user/${username}`)

  return {
    props: {
      profile,
    }
  }
}

export default Profile
