import axios from 'axios'
const service=axios.create({
  baseURL: '/',
  timeout: 3000
})
