import React from "react"
import Button from "../Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Landing = () => {
  return (
    <>
      <div className="text-lg">
        <span className="font-semibold">hoji</span> is a mindful blogging platform for sharing long posts and spontaneous thoughts.
      </div>

      <p className="mb-10">
        With <span className="font-semibold">hoji</span>, common concepts found in social media platforms are stripped away: no likes and follows, sharing to other platforms, or complex recommendation algorithms. The focus is less on the platform itself, but rather the people and ideas that are posted to it.
      </p>

      <Button
        variant="primary"
        href="/discover"
      >
        <div className="flex items-center">
          Discover More
          <FontAwesomeIcon className="ml-2" icon="chevron-right" />
        </div>
      </Button>
    </>
  )
}

export default Landing
