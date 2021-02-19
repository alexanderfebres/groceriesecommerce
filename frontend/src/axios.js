import axios from "axios";
import { endpoint } from "./constants";

const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

export default authAxios;
