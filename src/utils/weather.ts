import { iconMapWeatherToOpenMap } from "./iconMapping";

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
