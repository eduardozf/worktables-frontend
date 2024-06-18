import { Box, Flex, Text } from "monday-ui-react-core";
import { IMondayItem } from "../../context/MondayContext";
import RenderFlag from "../RenderFlag";
import { getColumn, parseTimezone } from "../../utils";

interface ICountryInfoProps {
  data: IMondayItem;
}

const CountryInfo = ({ data }: ICountryInfoProps) => {
  return (
    <Box
      border={Box.borders.DEFAULT}
      rounded={Box.roundeds.MEDIUM}
      marginBottom={Box.marginBottoms.MEDIUM}
      paddingBottom={Box.paddingBottoms.MEDIUM}
    >
      <Flex
        style={{ minHeight: "200px" }}
        align={Flex.align.END}
        justify={Flex.justify.STRETCH}
      >
        {/* Left Section */}
        <Flex style={{ flex: 1 }} direction={Flex.directions.COLUMN}>
          <Box>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>URL:</Text>
              <Text>{getColumn(data, "tld")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Timezones:</Text>
              <Text>{parseTimezone(getColumn(data, "timezones"))}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Region:</Text>
              <Text>{getColumn(data, "region")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Subregion:</Text>
              <Text>{getColumn(data, "subregion")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Capital:</Text>
              <Text>{getColumn(data, "capital")}</Text>
            </Flex>

            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Phone Code:</Text>
              <Text>{getColumn(data, "phone_code")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Currency:</Text>
              <Text>{getColumn(data, "currency")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>
                International Country Code:
              </Text>
              <Text>{getColumn(data, "iso3")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Currency Name:</Text>
              <Text>{getColumn(data, "currency_name")}</Text>
            </Flex>
          </Box>
        </Flex>

        {/* Center Section */}
        <Flex style={{ flex: 1 }} direction={Flex.directions.COLUMN}>
          <Box style={{ overflow: "visible" }}>
            <RenderFlag
              text={getColumn(data, "iso2")}
              height={90}
              style={{ boxShadow: "0 0 5px black" }}
            />
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Name:</Text>
              <Text>{data.name}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Location:</Text>
              <Text>{getColumn(data, "location")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Country Code:</Text>
              <Text>{getColumn(data, "iso2")}</Text>
            </Flex>
          </Box>
        </Flex>

        {/* Right Section */}
        <Flex style={{ flex: 1 }} direction={Flex.directions.COLUMN}>
          <Box>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Latitude:</Text>
              <Text>{getColumn(data, "latitude")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Longitude:</Text>
              <Text>{getColumn(data, "longitude")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Population:</Text>
              <Text>{getColumn(data, "numbers")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Area:</Text>
              <Text>{getColumn(data, "numbers6")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Population Density:</Text>
              <Text>{getColumn(data, "numbers2")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Net Migration:</Text>
              <Text>{getColumn(data, "numbers0")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>GDP ($ per capita):</Text>
              <Text>{getColumn(data, "numbers7")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Birthrate:</Text>
              <Text>{getColumn(data, "numbers9")}</Text>
            </Flex>
            <Flex gap={Flex.gaps.XS}>
              <Text style={{ fontWeight: "bold" }}>Deathrate:</Text>
              <Text>{getColumn(data, "numbers8")}</Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CountryInfo;
