import { Box, Flex, Text } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";

const TableErrorState = () => {
  return (
    <Box padding={Box.paddings.XXXL}>
      <Flex
        direction={Flex.directions.COLUMN}
        justify={Flex.justify.CENTER}
        align={Flex.align.CENTER}
      >
        <Heading type={Heading.types.H2} id="empty-state-id">
          Something went wrong!
        </Heading>
        <Text
          element="span"
          type={Text.types.TEXT1}
          style={{
            width: "50%",
            textAlign: "center",
          }}
          ellipsis={false}
        >
          There was a problem retrieving the data. Please refresh the page or
          try again later.
        </Text>
      </Flex>
    </Box>
  );
};

export default TableErrorState;
