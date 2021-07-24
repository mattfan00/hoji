import Header from "../../components/Header"
import Entry from "../../components/Entry"
import PageWrapper from "../../components/PageWrapper"
import { fetcher } from "../../lib/query"

const EntryView = ({ entry }) => {
  return (
    <>
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
      </PageWrapper>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  const entry = await fetcher({ queryKey: `/entry/${id}`})

  console.log(entry)

  return {
    props: {
      entry
    }
  }
}

export default EntryView
