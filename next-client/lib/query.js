import { QueryClient } from "react-query"
import axios from "axios"

export const fetcher = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey)
  return data
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: fetcher,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})
