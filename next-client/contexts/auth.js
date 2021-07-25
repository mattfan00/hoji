import { useState, createContext, useContext } from "react"
import { useQuery } from "react-query"

export const AuthContext = createContext()

export const AuthProvider = ({
  children,
  initialUser,
}) => {
  /*
  const { isLoading } = useQuery(`/auth/me`, {
    onSuccess: (data) => {
      setUser(data)
    },
    //initialData: initialUser
  })
  */

  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        //isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
