import React from "react"
import CustomInput from "../CustomInput"

const EditThought = ({
  onContentChange,
}) => {
  const handleChange = (value) => {
    onContentChange(value.replace("\n\n", "\n"))
  }
   
  return (
    <>
      <CustomInput
        placeholder="ideate your thought here..."
        onChange={handleChange}
        autofocus
        // initial="hey"
      />
    </>
  )
}

export default EditThought
