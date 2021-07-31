import { serverQuery } from "./axios"

export const getCurrentUser = async (req) => {
  const { data: user } = await serverQuery(req).get(`/auth/me`)

  return user || null
}
