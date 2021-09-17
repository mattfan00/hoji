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
        placeholder="Give your entry a title..."
        onChange={(_, value) => onTitleChange(value)}
        initial={initialTitle}
        tagName="h1"
        charLimit={200}
        autofocus={true}
      />

      <Slab 
        content={content}
        setContent={setContent}
        placeholder="Start writing here..."
        focus={true}
      />
    </>
  )
}

export default Post
