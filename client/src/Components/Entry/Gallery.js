import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Gallery = ({ 
  content, 
  photos,
  expanded
}) => {
  const getDisplayedPhotos = () => {
    if (photos.length > 4) {
      if (photos.length === 5) {
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
      <div className="mb-4">{content}</div>
      <div className="grid xs:grid-cols-5 grid-cols-4 gap-2">
        {getDisplayedPhotos().map(photo => (
          <div key={photo} style={{'backgroundImage': `url(https://picsum.photos/200/300?random=${photo})`}} className="image-card relative bg-cover">
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

export default Gallery
