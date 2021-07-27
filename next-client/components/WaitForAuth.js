import { useAuth } from "../contexts/auth"

const WaitForAuth = ({ children }) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <></>
  }

  return children
}

export default WaitForAuth
