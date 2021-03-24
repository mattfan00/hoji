import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "../Components/Button"
import CustomInput from "../Components/CustomInput"

const NewThought = () => {
  const [text, setText] = useState("")
  const history = useHistory()

  const handleChange = (value) => {
    // console.log(value)
    setText(value)
  }

  const submit = () => {
    console.log(text)
    history.push("/matt")
  }

  const cancel = () => {
    history.push("/matt")
  }

  const getNumCharacters = () => {
    const newText = text.replace("\n\n", "\n")
    return newText.length
  }

  return (
    <div>
      <div className="flex mb-2 items-center">
        <div className="mr-4 font-medium">@mattfan00</div>
        <div className="mr-4 text-xs tracking-wide uppercase text-gray-400">Mar 21, 2021</div>
        <div className="label">thought</div>
      </div>

      <CustomInput
        className="mb-10"
        placeholder="ideate your thought here..."
        onChange={handleChange}
        // initial="hey"
        // tagName="h2"
      />

      <div className="flex">
        <Button className="mr-2" type="primary" onClick={submit}>Submit</Button>
        <Button onClick={cancel}>Cancel</Button>
        {/* {text.length} */}
      </div>
    </div>
  )
}

export default NewThought