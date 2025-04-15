import axios from "axios";

const baseURL = "http://8.137.77.237:8888";

const service = axios.create({
  baseURL,
  timeout: 0,
});
export default service;