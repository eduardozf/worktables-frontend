import { parseISO } from "date-fns";
import {
  IWeatherForecastItem,
  IWeatherInfo,
  IWeatherInfoHour,
} from "../components/WeatherForecastItem";
import { iconMapWeatherToOpenMap } from "./iconMapping";

// Map input to expected interface
const parseCommon = (item: any): IWeatherInfo => {
  const weatherInfo: IWeatherInfo = {
    avg_temp_c: item?.avgtemp_c || item?.temp_c || 0,
    avg_humidity: item?.avghumidity || 0,
    avg_wind_speed: item?.avgvis_km || 0,
    avg_rain_chance: item?.daily_chance_of_rain || item?.chance_of_rain || 0,
    condition: item?.condition?.text || "None",
    icon: item?.condition?.icon || "/error.jpg",
  };

  return weatherInfo;
};

// Map input to expected interface
export const parseWeatherData = (data: any): IWeatherForecastItem[] => {
  const forecastData = data?.forecast?.forecastday;
  if (!forecastData) return [];

  return forecastData?.map((item: any) => {
    const day_resume = parseCommon(item?.day);

    const hour: IWeatherInfoHour[] = item?.hour?.map((hourItem: any) => {
      return {
        time: parseISO(hourItem?.time || "0"),
        ...parseCommon(hourItem),
      };
    });

    return {
      date: parseISO(item?.date || "0"),
      day_resume,
      hour,
    };
  });
};

// Find custom animated weather icon by WeatherApi url
export const getOpenWeatherMapIcon = (url: string): string => {
  const match = url.match(/\/(\d+)\.png$/);
  const emptyUrl = "/error.jpg";
  if (!match) return emptyUrl;

  const iconCode = match[1] as any;
  const mapObjet: any = iconMapWeatherToOpenMap;

  if (url.includes("day")) {
    return mapObjet?.day?.[iconCode] || emptyUrl;
  }
  if (url.includes("night")) {
    return mapObjet?.night?.[iconCode] || emptyUrl;
  }

  return emptyUrl;
};
