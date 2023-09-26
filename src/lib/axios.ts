import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dont-forget-backend-production-ff0c.up.railway.app',
})
