import React, { useState } from "react"
import Button from "../Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DefaultProPic from "../Icons/DefaultProPic"

const ProfileHeader = () => {
  const [bookmark, setBookmark] = useState(false)

  const toggleBookmark = () => {
    setBookmark(!bookmark)
  }

  return (
    <div className="mb-16 p-5 rounded-xl shadow-md">
      <div className="flex items-center mb-6">
        <div className="mr-5 w-12 h-12 rounded-full overflow-hidden">
          <DefaultProPic />
        </div>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <h2 className="mb-0 mr-3">Matthew Fan</h2>
              <div className="text-gray-400">he/him</div>
            </div>
            <div>@mattfan00</div>
          </div>
          <Button onClick={toggleBookmark}>
            <FontAwesomeIcon icon={[bookmark ? "fas" : "far", "bookmark"]} size="lg" />
          </Button>
        </div>
      </div>
      <p>Senior at New York University studying Computer Science. I love to play video games, build apps, and eat food. Enjoy my content!</p>
    </div>
  )
}

export default ProfileHeader