import CustomInput from "../CustomInput"
import Slab from "../Slab"

const Post = ({
  content,
  setContent,
  onTitleChange,
  initialTitle,
}) => {
  return (
    <>
      <CustomInput
        className="mb-8"
        placeholder="give your entry a title..."
        onChange={(value) => onTitleChange(value)}
        initial={initialTitle}
        tagName="h1"
        charLimit={200}
      />

      <Slab 
        content={content}
        setContent={setContent}
      />
    </>
  )
}

export default Post
