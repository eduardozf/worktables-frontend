import { Box, Flex, Text } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";

const TableEmptyState = () => {
  return (
    <Box padding={Box.paddings.XXXL}>
      <Flex
        direction={Flex.directions.COLUMN}
        justify={Flex.justify.CENTER}
        align={Flex.align.CENTER}
      >
        <img
          style={{
            width: "390px",
          }}
          src={"/emptyStateExample.svg"}
          alt=""
        />
        <Heading type={Heading.types.H2} id="empty-state-id">
          No results found!
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
          Check the search criteria or try again later.
        </Text>
      </Flex>
    </Box>
  );
};

export default TableEmptyState;
