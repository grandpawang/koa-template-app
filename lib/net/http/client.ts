import axios from "axios";

// create an axios instance
const service = axios.create({
  timeout: 50000, // request timeout
  headers: { "Content-Type": "application/json;charset=UTF-8" },
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (sessionStorage.getItem("token")) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.url = config.url + "?token=" + sessionStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  (response) => {
    /**
     * http的code
     */
    return response;
  },
  (error) => {
    console.log(error);
    return error;
  }
);

export default service;
