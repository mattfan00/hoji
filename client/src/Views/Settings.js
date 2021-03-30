import React from "react"
import DefaultProPic from "../Icons/DefaultProPic"
import Button from "../Components/Button"
import Input from "../Components/Input"
import TextArea from "../Components/TextArea"


const Settings = () => {
  return (
    <>
      <h2>General</h2>
      <div class="p-8 rounded-lg shadow-md mb-10">
        <div className="flex items-center mb-6">
          <div className="mr-5 w-12 h-12 rounded-full overflow-hidden">
            <DefaultProPic />
          </div>
          <Button className="mr-2">Upload</Button>
          <Button>Remove</Button>
        </div>

        <Input className="mb-4" label="Name" name="name" autocompleteOff />
        <Input className="mb-4" label="Username" name="username" autocompleteOff />
        <Input className="mb-4" label="Pronouns" name="pronouns" autocompleteOff />
        <Input className="mb-4" label="Website" name="website" autocompleteOff />
        <TextArea label="Description" name="description" />
      </div>

      <h2>Account</h2>
      <div class="p-8 rounded-lg shadow-md mb-10">
      </div>
    </>
  )
}

export default Settings