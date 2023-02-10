import axios from "axios";

axios.defaults.baseURL = "https://chat-test-be.onrender.com";
// axios.defaults.baseURL = process.env.API_URL || "http://localhost:8000";

export function setToken(token: string) {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
}
