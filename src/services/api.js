import axios from "axios";
const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

// 🔑 Restore token on page load
const token = localStorage.getItem("token");
if (token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export default API;
