import axios from "axios"
import { BASE_API_URL } from "../lib"

export class ApiService {
  protected baseAxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  constructor() {}
}
