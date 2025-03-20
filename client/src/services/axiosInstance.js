import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Change this to your API server URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Allow sending cookies with requests
});

// ✅ Response Interceptor - Handle Auth Errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("Session expired! Redirecting to login...");
        window.location.href = "/login"; // Redirect to login page
      } else if (status === 403) {
        console.error("Forbidden: You don't have permission.");
      } else if (status >= 500) {
        console.error("Server error! Try again later.");
      }
    } else {
      console.error("Network error! Check your internet connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
