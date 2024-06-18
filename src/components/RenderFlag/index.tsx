import { Box, Flex } from "monday-ui-react-core";
import { InputHTMLAttributes } from "react";
import { config } from "../../config";

interface ITableProps extends InputHTMLAttributes<HTMLImageElement> {
  text: string;
  [x: string]: any;
}

const RenderFlag = ({ text, ...rest }: ITableProps) => {
  const endpoint = config.flagsEndpoint;

  return (
    <Flex>
      <Box
        rounded={Box.roundeds.SMALL}
        paddingY={Box.paddingYs.LARGE}
        style={{ overflow: "visible" }}
      >
        <img
          src={`${endpoint}/${text}.svg`}
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
