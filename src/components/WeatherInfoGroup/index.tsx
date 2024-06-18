import { Flex, Text } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";

interface IInfoGroupProps {
  info: string | number;
  unit?: string;
  label: string;
}

const WeatherInfoGroup = ({ info, unit, label }: IInfoGroupProps) => {
  return (
    <Flex direction={Flex.directions.COLUMN} align={Flex.align.START}>
      <Flex align={Flex.align.BASELINE} gap={Flex.gaps.XS}>
        <Heading>{info}</Heading>
        {unit && <Text>{unit}</Text>}
      </Flex>
      <Text style={{ fontSize: ".8rem" }}>{label}</Text>
    </Flex>
  );
};

export default WeatherInfoGroup;
