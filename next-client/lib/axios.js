import axios from "axios"
import { BASE_URL } from "./constants"

const createRefreshInterceptor = (instance) => {
  instance.interceptors.response.use((response) => {
    return response
  }, async (error) => {
    // token is no longer valid
    if (error.response.status === 401 && error.response.data.message == "Token is not valid") {
      const originalRequest = error.config
      originalRequest._retry = true

      return fetch(`${BASE_URL}/auth/refresh_token`, {
        method: "POST",
        headers: originalRequest.headers,
        credentials: "include"
      })
        .then((response) => {
          if (response.ok) {
            return axios(originalRequest)
          } else {
            return error
          }
        })
      
    }

    return Promise.reject(error)
  })
}

export const serverQuery = ({ req }) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: req.headers,
  })

  createRefreshInterceptor(instance)

  return instance
}

export const clientQuery = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  })

  createRefreshInterceptor(instance)

  return instance
}
