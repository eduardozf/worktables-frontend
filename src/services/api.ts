import axios from "axios";
import { config } from "../config";

const { baseURL } = config.api;

const weatherApi = axios.create({ baseURL });

export { weatherApi };
