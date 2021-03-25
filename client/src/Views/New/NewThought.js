import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "../../Components/Button"
import CustomInput from "../../Components/CustomInput"
import FadeAnimation from "../../Components/FadeAnimation"

const NewThought = () => {
  const [text, setText] = useState("")
  const history = useHistory()
  const charLimit = 280

  const handleChange = (value) => {
    setText(value.replace("\n\n", "\n"))
  }

  const submit = () => {
    console.log(text)
    history.push("/matt")
  }

  const cancel = () => {
    history.push("/matt")
  }

  const charLeft = () => {
    return charLimit - text.length
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

      <div className="flex justify-between items-center">
        <div className="flex">
          <Button
            className="mr-2"
            type="primary"
            onClick={submit}
            disabled={text.length == 0 || charLeft() < 0}
          >Submit</Button>
          <Button onClick={cancel}>Cancel</Button>
        </div>

        <FadeAnimation show={charLeft() <= 20}>
          <div>
            <span className={`font-semibold${charLeft() < 0 ? " text-red-500" : ""}`}>{charLeft()} </span>
            characters left</div>
        </FadeAnimation>
      </div>
    </div>
  )
}

export default NewThought