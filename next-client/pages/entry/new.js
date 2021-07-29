import NewEntryPage from "../../modules/entry/NewEntryPage"
import WaitForAuth from "../../components/WaitForAuth"

const NewEntry = () => {
  return (
    <WaitForAuth>
      <div className="w-screen h-screen px-8">
        <div className="max-w-2xl mx-auto h-full">
          <NewEntryPage />
        </div>
      </div>
    </WaitForAuth>
  )
}

export default NewEntry
