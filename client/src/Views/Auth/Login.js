import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import { Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../../Context/AuthContext"
// import GoogleButton from "../../Components/GoogleButton"
// import GoogleLogin from "react-google-login"

const Login = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  })
  
  const history = useHistory()
  const { setUser } = useContext(AuthContext)

  // const responseGoogle = (data) => {
  //   console.log(data)
  // }

  const isLoginDisabled = () => {
    return fields.email === "" || fields.password === ""
  }

  const login = async () => {
    const loginResult = await axios.post("/auth/login", {
      email: fields.email,
      password: fields.password
    })

    setUser(loginResult.data)

    history.push(`/${loginResult.data.username}`)
  }

  return (
    <div className="max-w-xs m-auto">
      <div className="mb-5">
        <h2 className="mb-0">Login</h2>
        <div className="text-xs">Welcome back to <span className="font-semibold">hoji</span>!</div>
      </div>
      {/* <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        render={renderProps => (
          // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
          <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} />
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> */}
      <div className="mb-5">
        <Input
          className="mb-2" label="Email" placeholdername="email" required
          value={fields.email}
          onChange={(e) => setFields({...fields, email: e.target.value})}
        />
        <Input
          className="mb-2" label="Password" type="password" name="password" required
          value={fields.password}
          onChange={(e) => setFields({...fields, password: e.target.value})}
        />
      </div>
      {/* <div className="mb-4 text-xs">Forgot password?</div> */}
      <Button
        className="w-full" type="primary"
        disabled={isLoginDisabled()}
        onClick={login}
       >Login</Button>
      <div className="text-center mt-2 text-xs">Don't have an account? <Link to="/register">Register</Link></div>
    </div>
  )
}

export default Login
