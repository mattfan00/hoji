import React, { useRef, useEffect } from "react"

const ClickOutside = ({
  children,
  action
}) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        action(e)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  return (
    <div ref={ref}>
      {children}
    </div>
  )
}

export default ClickOutside