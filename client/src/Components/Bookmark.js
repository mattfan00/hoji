import React from "react"
import DefaultProPic from "../Icons/DefaultProPic"
import { Link } from "react-router-dom"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Bookmark = ({
  name,
  username,
  description
}) => {
  return (
    <Link
      to={`/${username}`}
      className="flex mb-8 justify-between">
      <div className="flex flex-none w-40 mr-4">
        <div className="mr-3 w-10 h-10 rounded-full overflow-hidden">
          <DefaultProPic />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">{name}</div>
          <div className="text-xs">@{username}</div>
        </div>
      </div>

      <div className="flex-1">{description}</div>

      {/* <FontAwesomeIcon icon="chevron-right" /> */}
    </Link>
  )
}

export default Bookmark