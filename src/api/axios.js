// src/api/axios.js (or src/api.js)
import axios from "axios";

const API = axios.create({
  baseURL: "https://trinity-housing-backend.onrender.com/api",
  withCredentials: true,
});

export default API; 