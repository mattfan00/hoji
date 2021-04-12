import React from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SelectNew = ({ 
  active,
  onChange,
}) => {
  return (
    <div className="flex mb-10">
      <Button 
        size="sm" active={active === "post"} className="mr-3"
        variant="text"
        onClick={() => onChange("post")}
      >
        <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "comment-alt"]} />
        Post
      </Button>
      <Button 
        size="sm" active={active === "thought"} className="mr-3"
        variant="text"
        onClick={() => onChange("thought")}
      >
        <FontAwesomeIcon className="fa-fw mr-1.5" icon={["far", "lightbulb"]} />
        Thought
      </Button>
    </div>
  )
}

export default SelectNew
