import axios from "axios";
axios.defaults.headers = {
  "Content-Type": "application/json",
};
const instance = axios.create({
  baseURL: "http://localhost:5001/clone-ba6ee/us-central1/api", //the API URL
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
