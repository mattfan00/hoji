import Footer from "../../components/Footer"
import Entry from "../../components/Entry"

const EntryPage = ({ entry }) => {
  return (
    <>
      <Entry
        entry={entry}
        author={entry.user}
        expanded={true}
      />
      <Footer 
        author={entry.user}
      />
    </>
  )
}

export default EntryPage
