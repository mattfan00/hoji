import { QueryClient } from "react-query"
import { clientQuery } from "./axios"


export const fetcher = async ({ queryKey }) => {
  const { data } = await clientQuery().get(queryKey[0])
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
