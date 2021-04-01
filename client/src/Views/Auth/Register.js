import React, { useState } from "react"
import Input from "../../Components/Input"
import TextArea from "../../Components/TextArea"
import Button from "../../Components/Button"
import { Link } from "react-router-dom"

const Register = () => {
  const [page, setPage] = useState(0)
  const [fields, setFields] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    description: "",
    website: "",
  })

  const isNextDisabled = () => {
    return fields.email === "" || fields.password === ""
  }

  const isRegisterDisabled = () => {
    return fields.email === "" || fields.password === "" || fields.name === "" || fields.username === ""
  }

  return (
    <div className="max-w-xs m-auto">
      <div className="mb-5">
        <h2 className="mb-0">Register</h2>
        {page === 0 ? (
        <div className="text-xs">Get started with <span className="font-semibold">hoji</span>!</div>
        ) : (
        <div className="text-xs">We just need a few more details then you are good to go!</div>
        )}
      </div>

      {page === 0 ? (
      <>
        <div className="mb-5">
          <Input
            className="mb-2" label="Email" type="email" name="email" autocompleteOff required
            value={fields.email}
            onChange={(e) => setFields({...fields, email: e.target.value})}
          />
          <Input
            label="Set Password" type="password" name="password" autocompleteOff required
            value={fields.password}
            onChange={(e) => setFields({...fields, password: e.target.value})}
          />
        </div>
        {/* <Input className="mb-2" label="Confirm Password" type="password" name="confirmPassword" autocompleteOff /> */}
        <Button
          className="w-full" onClick={() => setPage(1)}
          disabled={isNextDisabled()}
        >
          Next
        </Button>
      </>
      ) : (
      <>
        <div className="mb-5">
          <Input
            className="mb-2" label="Display Name" name="name" autocompleteOff required
            value={fields.name}
            onChange={(e) => setFields({...fields, name: e.target.value})}
          />
          <Input
            className="mb-2" label="Username" name="username" autocompleteOff required
            value={fields.username}
            onChange={(e) => setFields({...fields, username: e.target.value})}
          />
          <TextArea
            className="mb-2 max-h-28" label="Profile Description" name="description" autocompleteOff
            value={fields.description}
            onChange={(e) => setFields({...fields, description: e.target.value})}
          />
          <Input
            label="Website" name="website" autocompleteOff
            value={fields.website}
            onChange={(e) => setFields({...fields, website: e.target.value})}
          />
        </div>

        <Button className="mb-2 w-full" onClick={() => setPage(0)}>
          Previous
        </Button>
        <Button
          className="w-full" type="primary" onClick={() => setPage(1)}
          disabled={isRegisterDisabled()}
        >
          Register
        </Button>
      </>
      )}
      <div className="text-center mt-2 text-xs">Already have an account? <Link to="/login">Login</Link></div>
    </div>
  )
}

export default Register