import { Box, Flex } from "monday-ui-react-core";
import { InputHTMLAttributes } from "react";

interface ITableProps extends InputHTMLAttributes<HTMLImageElement> {
  text: string;
  [x: string]: any;
}

const RenderFlag = ({ text, ...rest }: ITableProps) => {
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
          {...rest}
        />
      </Box>
    </Flex>
  );
};

export default RenderFlag;
