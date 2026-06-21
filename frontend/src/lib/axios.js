import { create } from "axios";

export const axiosInstance = create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5050/api"
      : "/api",
  withCredentials: true,
});
