import React from "react"
import Bookmark from "../Components/Bookmark"

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
        <Bookmark
          name={name}
          username={username}
          description={description}
        />
      ))}
    </>
  )
}

export default Bookmarks