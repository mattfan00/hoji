import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ListGroup, Button, Dropdown } from "../../ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Pages = () => {
  const [items, setItems] = useState([
    { id: "1", text: "hello" },
    { id: "2", text: "bye" },
    { id: "3", text: "no" },
  ])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (
      !destination || 
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) return

    const tempItems = [...items]
    const [removed] = tempItems.splice(source.index, 1);
    tempItems.splice(destination.index, 0, removed);

    setItems(tempItems)
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
          <div 
            className="mb-5" 
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <ListGroup className="bg-gray-100">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}
                >
                  {(provided) => (
                  <ListGroup.Item
                    className="bg-white"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1">{item.text}</div>

                      <Dropdown>
                        <Dropdown.Button
                          variant="ghost"
                          size="sm"
                        >
                          <FontAwesomeIcon className="text-gray-400" icon="ellipsis-h" />
                        </Dropdown.Button>

                        <Dropdown.Menu>
                          <Dropdown.Item href={``}>
                            <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "edit"]} />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {}}>
                            <span className="text-red-500">
                              <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "trash-alt"]} />
                              Delete
                            </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </ListGroup.Item>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ListGroup>
          </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button href="/publish/page">Add a new page</Button>
    </>
  )


}

export default Pages
