import React, { useState, createContext } from "react"
import { useQuery } from "react-query"

const AuthContext = createContext()

const AuthProvider = ({
  children
}) => {
  const { isLoading } = useQuery(`/auth/me`, {
    onSuccess: (data) => {
      setUser(data)
    },
  })

  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading: isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
