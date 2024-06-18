export {};

declare global {
  interface IWeatherInfo {
    avg_temp_c: number;
    avg_humidity: number;
    avg_wind_speed: number;
    avg_rain_chance: number;
    condition: string;
    icon: string;
  }

  interface IWeatherInfoHour extends IWeatherInfo {
    time: Date;
  }

  interface IWeatherForecastItem {
    date: Date;
    day_resume: IWeatherInfo;
    hour: Array<IWeatherInfoHour>;
  }

  type WeatherSources = "weather_api" | "open_weather_map";

  interface IWeatherResponse {
    source: WeatherSources;
    data: Array<IWeatherForecastItem>;
  }
}
