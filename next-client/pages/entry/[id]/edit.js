import EditEntryPage from "../../../modules/entry/EditEntryPage"
import WaitForAuth from "../../../components/WaitForAuth"

const EditEntry = () => {
  return (
    <WaitForAuth>
      <div className="w-screen h-screen px-8">
        <div className="max-w-2xl mx-auto h-full">
          <EditEntryPage />
        </div>
      </div>
    </WaitForAuth>
  )
}

export default EditEntry
