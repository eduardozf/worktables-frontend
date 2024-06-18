import { format } from "date-fns";
import { Box, Divider, Flex, Text } from "monday-ui-react-core";
import { getOpenWeatherMapIcon } from "../../utils";
import WeatherHourCard from "../WeatherHourCard";
import WeatherInfoGroup from "../WeatherInfoGroup";

export interface IWeatherInfo {
  avg_temp_c: number;
  avg_humidity: number;
  avg_wind_speed: number;
  avg_rain_chance: number;
  condition: string;
  icon: string;
}

export interface IWeatherInfoHour extends IWeatherInfo {
  time: Date;
}

export interface IWeatherForecastItem {
  date: Date;
  day_resume: IWeatherInfo;
  hour: Array<IWeatherInfoHour>;
}

interface IWeatherItemProps {
  forecast: IWeatherForecastItem;
}

const WeatherForecastItem = ({ forecast }: IWeatherItemProps) => {
  return (
    <Box
      padding={Box.paddings.MEDIUM}
      rounded={Box.roundeds.MEDIUM}
      border={Box.borders.DEFAULT}
    >
      <Text style={{ fontWeight: "bold" }} className="opacity-70">
        {format(forecast.date, "MM/dd/yyyy")}
      </Text>
      <Divider />

      <Flex align={Flex.align.END} justify={Flex.justify.SPACE_BETWEEN} wrap>
        <Flex align={Flex.align.START}>
          <Box>
            <img
              src={getOpenWeatherMapIcon(forecast.day_resume.icon)}
              alt={forecast.day_resume.condition}
              height={40}
              style={{ filter: "drop-shadow(0 0 1px black)" }}
            />
          </Box>
          <WeatherInfoGroup
            info={forecast.day_resume.condition}
            label={"Condition"}
          />
        </Flex>
        <Flex justify={Flex.justify.END} gap={Flex.gaps.MEDIUM}>
          <WeatherInfoGroup
            info={forecast.day_resume.avg_temp_c}
            label={"Temperature"}
            unit={"°C"}
          />
          <WeatherInfoGroup
            info={forecast.day_resume.avg_humidity}
            label={"Humidity"}
            unit={"%"}
          />
          <WeatherInfoGroup
            info={forecast.day_resume.avg_wind_speed}
            label={"Wind Speed"}
            unit={"km/h"}
          />
        </Flex>
      </Flex>

      <Box scrollable paddingY={Box.paddingYs.LARGE}>
        <Flex gap={Flex.gaps.SMALL} justify={Flex.justify.SPACE_BETWEEN}>
          {forecast?.hour?.map((hourInfo) => (
            <WeatherHourCard {...hourInfo} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default WeatherForecastItem;
