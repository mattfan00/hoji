import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "../../Components/Button"
import CustomInput from "../../Components/CustomInput"

const NewPost = () => {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const history = useHistory()

  const handleDescriptionChange = (value) => {
    setText(value)
  }

  const handleTextChange = (value) => {
    setText(value)
  }

  const handleTitleChange = (value) => {
    setText(value)
  }

  const submit = () => {
    console.log(text)
    history.push("/matt")
  }

  const cancel = () => {
    history.push("/matt")
  }

  return (
    <div>
      <div className="flex mb-2 items-center">
        <div className="mr-4 font-medium">@mattfan00</div>
        <div className="mr-4 text-xs tracking-wide uppercase text-gray-400">Mar 21, 2021</div>
        <div className="label">post</div>
      </div>

      <CustomInput
        className="mb-2"
        placeholder="give your post a title..."
        onChange={handleTitleChange}
        autofocus
        // initial="hey"
        tagName="h2"
      />

      <CustomInput
        className="mb-10"
        placeholder="give your post a description..."
        onChange={handleDescriptionChange}
        // initial="hey"
      />

      <CustomInput
        className="mb-10"
        placeholder="start writing your post here..."
        onChange={handleTextChange}
        // initial="hey"
      />

      <div className="flex justify-between items-center">
        <div className="flex">
          <Button
            className="mr-2"
            type="primary"
            onClick={submit}
            // disabled={text.length == 0 || charLeft() < 0}
          >Submit</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default NewPost