import PageWrapper from "../../components/PageWrapper"
import EntryBuilder from "../../components/EntryBuilder"

const NewEntry = () => {
  return (
    <>
      <div className="w-screen h-screen px-8">
        <div className="max-w-2xl mx-auto h-full">
          <EntryBuilder />
        </div>
      </div>
    </>
  )
}

export default NewEntry
