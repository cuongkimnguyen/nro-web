import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://160.30.192.170/api/server',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

export const registerUser = async ({ username, password }) => {
  const response = await api.post('/cms', {
    username,
    password,
  })

  return response.data
}
