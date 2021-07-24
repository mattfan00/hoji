import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Entry from "../../components/Entry"
import PageWrapper from "../../components/PageWrapper"
import { fetcher } from "../../lib/query"

const EntryView = ({ entry }) => {
  return (
    <>
      <Head>
        <title>{entry.user.name} | hoji</title>
      </Head>
      {/*
      <Header profile={entry.user} />
      */}
      <PageWrapper>
        <Entry
          entry={entry}
          author={entry.user}
          expanded={true}
          community={true}
        />
        <Footer 
          author={entry.user}
        />
      </PageWrapper>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  const entry = await fetcher({ queryKey: `/entry/${id}`})

  return {
    props: {
      entry
    }
  }
}

export default EntryView
