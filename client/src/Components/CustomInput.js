import React, { useEffect, useRef } from "react"

const CustomInput = ({
  className,
  placeholder,
  onChange,
  initial,
  tagName,
}) => {
  const textInput = useRef(null)
  const CustomTag = tagName ? tagName : "div"

  useEffect(() => {
    textInput.current.focus()
  }, [])

  const emitChange = () => {
    onChange(textInput.current.innerText)
  }


  return (
    <div className={className}>
      <CustomTag
        className="custom-input focus:outline-none cursor-text"
        placeholder={placeholder}
        contentEditable="true"
        ref={textInput}
        dangerouslySetInnerHTML={{__html: initial}}
        onInput={emitChange}
      ></CustomTag>
    </div>
  )
}

export default CustomInput