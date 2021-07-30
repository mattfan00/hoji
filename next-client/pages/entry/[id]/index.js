import Head from "next/head"
import ContentWrapper from "../../../components/ContentWrapper"
import EntryPage from "../../../modules/entry/EntryPage"
import { serverQuery } from "../../../lib/axios"

const EntryView = ({ entry }) => {
  return (
    <>
      <Head>
        <title>{entry.user.name} | hoji</title>
      </Head>

      <ContentWrapper>
        <EntryPage entry={entry} />
      </ContentWrapper>
    </>
  )
}

export const getServerSideProps = async ({ req, params }) => {
  const { id } = params

  const { data: entry } = await serverQuery(req).get(`/entry/${id}`)

  return {
    props: {
      entry
    }
  }
}

export default EntryView
