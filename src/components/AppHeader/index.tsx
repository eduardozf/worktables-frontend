import { Heading } from "monday-ui-react-core/next";
import { Flex, Box, Icon } from "monday-ui-react-core";
import { MondayLogoOutline } from "monday-ui-react-core/icons";

const AppHeader = () => {
  return (
    <Box
      paddingY={Box.paddingYs.XL}
      rounded={Box.roundeds.SMALL}
      className="blueBgColor"
    >
      <Flex
        align={Flex.align.CENTER}
        justify={Flex.justify.CENTER}
        gap={Flex.gaps.SMALL}
      >
        <Icon
          icon={MondayLogoOutline}
          iconSize="45"
          style={{ transform: "scale(1, -1)" }}
          clickable={false}
          className="whiteColor"
        />
        <Heading
          type={Heading.types.H1}
          className="whiteColor"
          weight={Heading.weights.BOLD}
        >
          Worktables - Countries Detail
        </Heading>
      </Flex>
    </Box>
  );
};

export default AppHeader;
