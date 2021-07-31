import { useState } from "react"
import { ReactEditor, useSlate } from "slate-react"
import { Transforms } from "slate"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Button, Modal } from "../../../ui"
import FormInput from "../../../components/FormInput"
import { isBlockActive, unwrapLink, insertLink } from "../Utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Link = ({
}) => {
  const editor = useSlate()
  const [showURLInput, setShowURLInput] = useState(false)
  const [currSelection, setCurrSelection] = useState({})

  const cancelPreview = () => {
    // necessary for refocusing the editor
    Transforms.select(editor, currSelection)
    ReactEditor.focus(editor)

    hideModal()
  }

  const previewLink = () => {
    setShowURLInput(true)
    setCurrSelection(editor.selection)
  }

  const confirmLink = (url) => {
    insertLink(editor, url, currSelection)
    ReactEditor.focus(editor)

    hideModal()
  }

  const hideModal = () => {
    setShowURLInput(false)
    setCurrSelection({})
  }

  return (
    <>
      <Button
        variant="ghost"
        className="mr-1"
        active={isBlockActive(editor, "link")}
        onMouseDown={(e) => {
          //e.preventDefault()
          console.log("mouse down")

          if (isBlockActive(editor, "link")) {
            unwrapLink(editor)
          } else {
            previewLink()
          }
        }}
        disabled={!editor.selection || isBlockActive(editor, "image")}
      ><FontAwesomeIcon icon="link" /></Button>

      <Modal
        open={showURLInput}
        onClose={() => setShowURLInput(false)}
      >
        <Formik
          initialValues={{ url: "" }}
          validationSchema={Yup.object({
           url: Yup.string().url('Invalid URL').required('Required'),
          })}
          onSubmit={(values) => {
            confirmLink(values.url)
          }}
        >
          <Form>
            <FormInput 
              name="url"
            />

            <div className="flex justify-end mt-2">
              <Button 
                className="mr-2" 
                onMouseDown={cancelPreview}
              >Cancel</Button>
              <Button 
                variant="primary" 
                type="submit"
              >Submit</Button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  )
}

export default Link
