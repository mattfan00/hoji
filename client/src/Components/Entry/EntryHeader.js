import React from "react"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import DefaultProPic from "../../Icons/DefaultProPic"

const EntryHeader = ({
  author,
  createdAt,
  expanded,
}) => {
  const dateFormat = () => {
    if (dayjs().isSame(createdAt, "day")) {
      return dayjs(createdAt).format("h:mm a") 
    } else {
      return dayjs(createdAt).format("MMM D, YYYY")
    }
  }

  return (
    <div className="flex mb-2 items-center">
      {expanded ? (
      <Link 
        to={`/${author?.username}`} 
        className="mr-3 text-xs font-medium hover:underline flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mr-2 w-6 h-6 rounded-full overflow-hidden">
          {author?.avatar ? (
            <img className="object-cover w-full h-full" alt="Avatar" src={author.avatar} />
          ) : (
            <DefaultProPic />
          )}
        </div>
        {author?.username}
      </Link> 
      ) : ""}

      <div className="mr-3 text-xs text-gray-400">{dateFormat()}</div>
    </div>
  )
}

export default EntryHeader
