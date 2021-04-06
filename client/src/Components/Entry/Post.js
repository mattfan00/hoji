import React from "react"

const Post = ({ 
  title,
  description,
  content,
  expanded,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{description}</div>
    </div>
  )
}

export default Post
