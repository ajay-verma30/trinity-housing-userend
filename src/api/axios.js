// src/api/axios.js (or src/api.js)
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default API; 