import axios from "axios";
import { config } from "../config";

const { baseURL } = config.api;

// Create axios instance with config.api url
const weatherApi = axios.create({ baseURL });

export { weatherApi };
