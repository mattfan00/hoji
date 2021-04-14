import React from "react"
import Bookmark from "../Components/Bookmark"
import ProfileHeader from "../Components/ProfileHeader"

const Bookmarks = () => {
  const bookmarks = [
    {
      name: "Matthew Fan",
      username: "mattfan00",
      description: "hey this is the best blog in the world"
    }, {
      name: "John Smith",
      username: "johnsmith",
      description: "Senior at New York University studying Computer Science. I love to play video games, build apps, and eat food. Enjoy my content!"
    }, {
      name: "Matthew Fan",
      username: "mattfan00",
      description: "hey this is the best blog in the world"
    }
  ]
  
  return (
    <>
      {bookmarks.map(({ name, username, description }) => (
        <div className="mb-4">
          <ProfileHeader
            name={name}
            username={username}
            description={description}
          />
        </div>
      ))}
    </>
  )
}

export default Bookmarks
