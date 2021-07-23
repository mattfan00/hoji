import Entry from "../../components/Entry"
import PageWrapper from "../../components/PageWrapper"
import { fetcher } from "../../lib/query"

const EntryView = ({ entry }) => {
  return (
    <PageWrapper>
      <Entry
        entry={entry}
        expanded={true}
      />
    </PageWrapper>
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
