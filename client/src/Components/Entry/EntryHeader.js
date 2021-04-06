import React from "react"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

const EntryHeader = ({
  author,
  created,
}) => {
  return (
    <div className="flex mb-2 items-center">
      <Link to={`/${author}`} className="mr-3 text-xs font-medium">{author}</Link>
      <div className="mr-3 text-xs text-gray-400">{dayjs(created).format("MMM D, YYYY")}</div>
      {/* <div className="label">{type}</div> */}
    </div>
  )
}

export default EntryHeader
