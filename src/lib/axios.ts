import { API_BASE_URL } from "@/static/appConfig";
import axios from "axios";

export const axiosAPI = axios.create({
  baseURL: API_BASE_URL,
});
