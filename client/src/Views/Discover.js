import React from "react"
import { useInfiniteQuery } from "react-query"
import { useHistory } from "react-router-dom"
import { Waypoint } from "react-waypoint"
import Entry from "../Components/Entry/Entry"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"

const Discover = () => {
  const history = useHistory()

  const fetchEntries = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`/entry/list?cursor=${pageParam}`)
    return data
  }

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(`/entry/list`, fetchEntries, {
    getNextPageParam: (lastPage, _) => {
      return lastPage.nextCursor
    },
  })

  const handleClick = (_, id) => {
    history.push(`/entry/${id}`)
  }

  return (
    <>
      <div className="mb-20">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.entries.map(({
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

        {isFetchingNextPage ? (
          <div className="flex justify-center mt-10">
            <FontAwesomeIcon 
              className="animate-spin text-primary"
              icon="circle-notch" 
              size="lg" 
            />
          </div>
        ) : ""}

        <Waypoint onEnter={() => {
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
