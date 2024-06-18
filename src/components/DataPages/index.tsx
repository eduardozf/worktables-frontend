import { Button, Flex } from "monday-ui-react-core";
import {
  NavigationChevronRight,
  NavigationChevronLeft,
} from "monday-ui-react-core/icons";
import { useMonday } from "../../context/MondayContext";

const DataPages = () => {
  const { getNextPage, getPrevPage, hasPrevPage, noMorePages } = useMonday();

  return (
    <Flex style={{ width: "100%" }} justify={Flex.justify.END}>
      <Flex gap={Flex.gaps.SMALL}>
        <Button
          disabled={!hasPrevPage}
          leftIcon={NavigationChevronLeft}
          onClick={() => {
            getPrevPage();
          }}
        >
          Previous Step
        </Button>
        <Button
          disabled={noMorePages}
          rightIcon={NavigationChevronRight}
          onClick={() => {
            getNextPage();
          }}
        >
          Next Page
        </Button>
      </Flex>
    </Flex>
  );
};

export default DataPages;
