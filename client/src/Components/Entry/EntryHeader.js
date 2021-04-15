import React from "react"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

const EntryHeader = ({
  user,
  createdAt,
}) => {
  return (
    <div className="flex mb-2 items-center">
      <Link to={`/${user}`} className="mr-3 text-xs font-medium">{user}</Link>
      <div className="mr-3 text-xs text-gray-400">{dayjs(createdAt).format("MMM D, YYYY")}</div>
    </div>
  )
}

export default EntryHeader
