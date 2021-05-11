import React, { useState, useEffect } from "react"

const FadeAnimation = ({
  show,
  children
}) => {
  const [shouldRender, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  return (
    shouldRender && (
      <div
        className={`absolute z-10 w-full ${show ? "animate-fade-enter" : "animate-fade-exit" }`}
        // style={{ animation: `${show ? "fade-enter" : ""} 1s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  )
}

export default FadeAnimation
