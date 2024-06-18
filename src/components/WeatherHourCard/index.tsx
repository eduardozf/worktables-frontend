import { format } from "date-fns";
import { Box, Flex, Text } from "monday-ui-react-core";
import { getOpenWeatherMapIcon } from "../../utils";

const WeatherHourCard = (data: IWeatherInfoHour) => {
  return (
    <Box
      padding={Box.paddings.SMALL}
      rounded={Box.roundeds.SMALL}
      border={Box.borders.DEFAULT}
      style={{
        minWidth: "40px",
        minHeight: "50px",
      }}
      shadow={Box.shadows.SMALL}
    >
      <Flex
        align={Flex.align.CENTER}
        justify={Flex.justify.CENTER}
        direction={Flex.directions.COLUMN}
      >
        <Text style={{ fontWeight: "bold" }} className="opacity-70">
          {format(data.time, "h aaaaa'm'")}
        </Text>
        <Box>
          <img
            src={getOpenWeatherMapIcon(data.icon)}
            alt={data.condition}
            height={35}
            style={{ filter: "drop-shadow(0 0 1px #555)" }}
            title={data.condition}
          />
        </Box>
        <Text className="opacity-70">{data.avg_temp_c}°C</Text>
      </Flex>
    </Box>
  );
};

export default WeatherHourCard;
