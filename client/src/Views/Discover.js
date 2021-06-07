import React, { useState } from "react"
import { useQuery, useInfiniteQuery } from "react-query"
import { useHistory } from "react-router-dom"
import Entry from "../Components/Entry/Entry"
import { Waypoint } from "react-waypoint"
import axios from "axios"

const Discover = () => {
  const history = useHistory()
  const [cursor, setCursor] = useState(0)

  const LIMIT = 10

  const fetchEntries = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`/entry/list?limit=${LIMIT}&cursor=${pageParam}`)
    return data
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(`/entry/list`, fetchEntries, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < LIMIT) {
        return undefined
      } else {
        return cursor
      }
    },
  })

  const handleClick = (e, id) => {
    history.push(`/entry/${id}`)
  }

  return (
    <>
      <div className="mb-20">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map(({
              id, 
              created_at,
              user,
              type, 
              title,
              description,
              content,
              photos,
            }, i) => (
              <>
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
              </>
           ))}
         </React.Fragment>
        ))}
        <Waypoint onEnter={() => {
          setCursor(cursor + LIMIT)
          fetchNextPage()
        }} />

        {/*
        entries?.map(({
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
        ))
        */}
      </div>
    </>
  )
}

export default Discover 
