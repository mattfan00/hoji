import React from "react"

const Thought = ({ content }) => {
  return (
    <div>{content}</div>
  )
}

const Post = ({ title, description }) => {
  return (
    <div>
      <h2 className="mb-2">{title}</h2>
      <div>{description}</div>
    </div>
  )
}

const Gallery = ({ caption, photos}) => {
  return (
    <div>
      <div className="mb-4">{caption}</div>
      <div className="flex">
        {photos.map(photo => (
          <div className="h-32 w-24 bg-gray-100 mr-2 rounded-lg"></div>
        ))}
      </div>
    </div>
  )
}

const Entry = ({
  username,
  date,
  type,
  // thought
  content,
  // post
  title, description,
  // gallery
  caption, photos,
}) => {
  return (
    <div className="mb-12">
      <div className="flex mb-2 items-center">
        <div className="mr-4 font-medium">@{username}</div>
        <div className="mr-4 text-xs tracking-wide uppercase text-gray-400">{date}</div>
        <div className="label">{type}</div>
      </div>

      {/* display thought */}
      {type === "thought" ? (
        <Thought content={content} />
      ) : ""}

      {/* display post */}
      {type === "post" ? (
        <Post title={title} description={description} />
      ) : ""}

      {/* display gallery */}
      {type === "gallery" ? (
        <Gallery caption={caption} photos={photos} />
      ) : ""}
    </div>
  )
}

export default Entry