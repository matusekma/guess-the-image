import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080/api"
      : "/api",
  timeout: 15000,
});
