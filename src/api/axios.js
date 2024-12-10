import axios from "axios";

const instance = axios.create({
  // UTILIZAR CUANDO ESTE EN PRODUCCIÓN
  // baseURL: "https://www.usmxxpress.online:4000/api",
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default instance;
