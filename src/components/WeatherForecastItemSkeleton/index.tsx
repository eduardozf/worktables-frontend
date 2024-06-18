import { Box, Divider, Flex, Skeleton } from "monday-ui-react-core";

const WeatherForecastItem = () => {
  return (
    <Box
      padding={Box.paddings.MEDIUM}
      rounded={Box.roundeds.MEDIUM}
      border={Box.borders.DEFAULT}
    >
      <Skeleton width={70} height={30} />
      <Divider />

      <Flex align={Flex.align.END} justify={Flex.justify.SPACE_BETWEEN} wrap>
        <Flex align={Flex.align.START} gap={Flex.gaps.SMALL}>
          <Skeleton width={50} height={50} type={Skeleton.types.CIRCLE} />
          <Skeleton width={200} height={50} />
        </Flex>
        <Flex justify={Flex.justify.END} gap={Flex.gaps.MEDIUM}>
          <Skeleton width={75} height={50} />
          <Skeleton width={75} height={50} />
          <Skeleton width={75} height={50} />
        </Flex>
      </Flex>

      <Box scrollable paddingY={Box.paddingYs.LARGE}>
        <Flex gap={Flex.gaps.SMALL} justify={Flex.justify.SPACE_BETWEEN}>
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
          <Skeleton width={45} height={70} />
        </Flex>
      </Box>
    </Box>
  );
};

export default WeatherForecastItem;
