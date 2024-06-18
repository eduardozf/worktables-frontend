import { Button, Flex } from "monday-ui-react-core";
import {
  NavigationChevronRight,
  NavigationChevronLeft,
} from "monday-ui-react-core/icons";

const DataPages = () => {
  // TODO functionality
  return (
    <Flex style={{ width: "100%" }} justify={Flex.justify.END}>
      <Flex gap={Flex.gaps.SMALL}>
        <Button disabled leftIcon={NavigationChevronLeft}>
          Previous Page
        </Button>
        <Button rightIcon={NavigationChevronRight}>Next Page</Button>
      </Flex>
    </Flex>
  );
};

export default DataPages;
