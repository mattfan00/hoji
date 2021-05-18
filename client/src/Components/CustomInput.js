import React, { useEffect, useRef } from "react"

const CustomInput = ({
  className,
  placeholder,
  onChange,
  initial,
  tagName,
  autofocus,
  charLimit,
}) => {
  const textInput = useRef(null)
  //const defaultValue = useRef(initial)
  const CustomTag = tagName ? tagName : "div"

  useEffect(() => {
    if (autofocus) {
      textInput.current.focus()
    }
  }, [autofocus])

  useEffect(() => {
    if (initial) {
      textInput.current.innerHTML = initial
    }
  }, [initial]) 

  const handleChange = (e) => {
    const charLength = textInput.current.innerText.trim().length
    if (charLength === 0) {
      textInput.current.innerText = ""
    }

    onChange(textInput.current.innerText)
  }

  const removeFormatting = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertHTML", false, text);
    handleChange(e)
  }

  return (
    <div className={className}>
      <CustomTag
        className="custom-input focus:outline-none cursor-text break-words"
        placeholder={placeholder}
        contentEditable="true"
        ref={textInput}
        //KdangerouslySetInnerHTML={{__html: defaultValue.current}}
        onInput={handleChange}
        onPaste={removeFormatting}
      ></CustomTag>
    </div>
  )
}

export default CustomInput
