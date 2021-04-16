import React from "react"
import CustomInput from "../CustomInput"

const EditThought = ({
  onContentChange,
  initial,
}) => {
  const handleChange = (value) => {
    console.log(value)
    onContentChange(value.replace("\n\n", "\n"))
  }
   
  return (
    <>
      <CustomInput
        placeholder="ideate your thought here..."
        onChange={handleChange}
        autofocus
        initial={initial}
      />
    </>
  )
}

export default EditThought
