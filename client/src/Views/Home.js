import React from "react"
import { useQuery } from "react-query"
import { useHistory } from "react-router-dom"
import Entry from "../Components/Entry/Entry"

const Home = () => {
  const history = useHistory()

  const { data: entries } = useQuery(`/entry/list`) 

  const handleClick = (e, id) => {
    history.push(`/entry/${id}`)
  }

  const sortedEntries = () => {
    return entries?.sort((a, b) => {
      const aDate = new Date(a.created_at)
      const bDate = new Date(b.created_at)
      return bDate - aDate
    })
  }

  return (
    <>
      {sortedEntries()?.map(({
        id, 
        created_at,
        user,
        type, 
        title,
        description,
        content,
        photos,
      }) => (
        <Entry
          key={id}
          id={id}
          onClick={(e) => handleClick(e, id)}
          author={user}
          createdAt={created_at}
          type={type}
          title={title}
          description={description}
          content={content}
          photos={photos}
        />
      ))}
    </>
  )
}

export default Home
