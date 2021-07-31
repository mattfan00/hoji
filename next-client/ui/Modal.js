import { Dialog } from "@headlessui/react"

export const Title = ({ children }) => {
  return (
    <Dialog.Title
      as="h2"
      className="mb-2"
    >
      {children}
    </Dialog.Title>
  )
}

export const Modal = ({
  children,
  open,
  onClose,
}) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      open={open}
      onClose={onClose}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <span
          className="inline-block h-screen align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transform bg-white shadow-xl rounded-2xl">
          {children}
        </div>
      </div>
    </Dialog>
  )
}

Modal.Title = Title

