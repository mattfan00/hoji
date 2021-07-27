import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Entry from "../../components/Entry"
import ContentWrapper from "../../components/ContentWrapper"
import { serverQuery } from "../../lib/axios"

const EntryView = ({ entry }) => {
  return (
    <>
      <Head>
        <title>{entry.user.name} | hoji</title>
      </Head>
      {/*
      <Header profile={entry.user} />
      */}
      <ContentWrapper>
        <Entry
          entry={entry}
          author={entry.user}
          expanded={true}
        />
        <Footer 
          author={entry.user}
        />
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
