import axios from 'axios';

// const baseURL = 'http://localhost:27017';

// let authTokens = localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authToken'))
// const URL = process.env.REACT_APP_API_URL;
const URL = 'http://localhost:5000';

const jwtToken = localStorage.getItem('jwt');

const axiosInterceptor = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
});

export default axiosInterceptor;

// axios.interceptors.request.use((request) => {
//   console.log(request);
//   // request.headers.channelName = "App";
//   return request;
// });
// axios.interceptors.response.use((response) => {
//   console.log(response);
//   return response;
// });
