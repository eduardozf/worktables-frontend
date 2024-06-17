import { Box, Flex } from "monday-ui-react-core";

interface ITableProps {
  text: string;
}

const TableFlag = ({ text }: ITableProps) => {
  return (
    <Flex>
      <Box rounded={Box.roundeds.SMALL} paddingY={Box.paddingYs.LARGE}>
        <img
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${text}.svg`}
          alt={text}
          onError={(event: any) => {
            event.target.src = "error.jpg";
          }}
          height={24}
          loading="lazy"
        />
      </Box>
    </Flex>
  );
};

export default TableFlag;
