import axios from 'axios';

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
export const registerUser = async ({ username, password }) => {
  const response = await api.post('/cms', {
    username,
    password,
  })

  return response.data
}
