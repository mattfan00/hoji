import React, { useState, useEffect, createContext } from "react"
import axios from "axios"

const AuthContext = createContext()

const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState(null)

  useEffect(async () => {
    try {
      const userResult = await axios.get("/auth/me")
      console.log(userResult.data)

      setUser(userResult.data)
    } catch(err) {
      console.log(err.response)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
