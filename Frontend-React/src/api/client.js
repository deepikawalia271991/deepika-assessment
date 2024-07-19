import axios from "axios";
import { baseUrl } from "./baseUrl";

export const axiosClient = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});