import Entry from "../../components/Entry"

const EntryPage = ({ entry }) => {
  return (
    <>
      <Entry
        entry={entry}
        author={entry.user}
        expanded={true}
      />
    </>
  )
}

export default EntryPage
