import { QueryClient } from "react-query"
import axios from "axios"

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey)
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
    }
  }
})

export { queryClient }
