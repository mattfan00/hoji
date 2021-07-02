import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './fontawesome'
import axios from "axios"
import Modal from "react-modal"

const BASE_URL = "http://localhost:8080"

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

axios.interceptors.response.use((response) => {
  return response
}, async (error) => {
  // token is no longer valid
  if (error.response.status === 401 && error.response.data.message == "Token is not valid") {
    const originalRequest = error.config
    originalRequest._retry = true
    
    return fetch(`${BASE_URL}/auth/refresh_token`, {
      method: "POST",
      headers: {
            'Content-Type': 'application/json',
      },
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

Modal.setAppElement("#root")

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
