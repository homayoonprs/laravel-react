import { message } from 'antd';
import axios from 'axios';


const client = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000',

    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
        'Accept': 'application/json',
    },
});

// Add a response interceptor
client.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data If Yout want

    return response.data;
  }, function (error) {
    if(error.response.status === 403){
      message.error('عدم دسترسی')
    }
    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error If Yout want

    return Promise.reject(error);
  }
);


// Add a Request interceptor
client.interceptors.request.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data If Yout want

    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error If Yout want

    return Promise.reject(error);
  }
);


export default client;
