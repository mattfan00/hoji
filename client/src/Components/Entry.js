import React from "react"
import EntryHeader from "./Entry/EntryHeader"
import Thought from "./Entry/Thought"
import Post from "./Entry/Post"
import Gallery from "./Entry/Gallery"

const Entry = ({
  author,
  created,
  type,
  content,
  title,
  description,
  photos,
  expanded,
}) => {
  return (
    <div className="mb-12">
      <EntryHeader
        author={author}
        created={created}
      />

      {/* display thought */}
      {type === "thought" ? (
        <Thought 
          content={content} 
        />
      ) : ""}

      {/* display post */}
      {type === "post" ? (
        <Post 
          title={title} 
          description={description} 
          expanded={expanded} 
        />
      ) : ""}

      {/* display gallery */}
      {type === "gallery" ? (
        <Gallery 
          content={content} 
          photos={photos} 
          expanded={expanded}
        />
      ) : ""}
    </div>
  )
}

export default Entry
