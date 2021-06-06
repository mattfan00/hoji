import React from "react"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

const EntryHeader = ({
  username,
  createdAt,
}) => {
  const dateFormat = () => {
    if (dayjs().diff(createdAt, "day") == 0) {
      return dayjs(createdAt).format("h:mm a") 
    } else {
      return dayjs(createdAt).format("MMM D, YYYY")
    }
  }

  return (
    <div className="flex mb-2 items-center">
      <Link 
        to={`/${username}`} 
        className="mr-3 text-xs font-medium hover:underline"
        onClick={(e) => e.stopPropagation()}
      >{username}</Link>
      <div className="mr-3 text-xs text-gray-400">{dateFormat()}</div>
    </div>
  )
}

export default EntryHeader
