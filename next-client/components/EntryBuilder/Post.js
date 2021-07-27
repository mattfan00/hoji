//import CustomInput from "../CustomInput"
import Slab from "../Slab"

const Post = ({
  content,
  setContent,
}) => {
  return (
    <>
      <Slab 
        content={content}
        setContent={setContent}
      />
    </>
  )
}

export default Post
