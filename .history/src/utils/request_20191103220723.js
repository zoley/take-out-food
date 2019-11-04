import axios from 'axios'
const service=axios.create({
  baseURL: '/',
  timeout: 3000
})
// ## Interceptors
// You can intercept requests or responses before they are handled by `then` or `catch`.
service.interceptors.request.use((config) => {
  // Do something before request is sent 
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});