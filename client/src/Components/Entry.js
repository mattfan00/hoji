import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
  const getDisplayedPhotos = () => {
    if (photos.length > 4) {
      if (photos.length == 5) {
        return photos
      } else {
        return photos.slice(0, 4)
      }
    } else {
      return photos
    }
  }

  return (
    <div>
      <div className="mb-4">{caption}</div>
      <div className="grid xs:grid-cols-5 grid-cols-4 gap-2">
        {getDisplayedPhotos().map(photo => (
          <div style={{'backgroundImage': `url(https://picsum.photos/200/300?random={photo})`}} className="image-card relative bg-cover">
          </div>
        ))}
        {photos.length > 5 ? (
        <div className="image-card">
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={["far", "images"]} size="2x" />
            <div className="break-all mt-2"><span className="font-semibold">{photos.length - 4}</span> more</div>
          </div>
        </div>
        ) : ""}
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