import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_API_URL
      : "http://localhost:5000",

});


//expired token interceptor
api.interceptors.response.use(
  response => response, 
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('profile'); 
      
      if (!refreshToken) return Promise.reject(error); 

      try {
        const { data } = await axios.post('/auth/refresh', { refreshToken });

        localStorage.setItem('profile', data.refreshToken);
        
        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
      
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default api;

