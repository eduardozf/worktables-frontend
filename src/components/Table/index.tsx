import {
  Table as MondayTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Link,
  Button,
  Box,
} from "monday-ui-react-core";
import { ExternalPage, NewTab } from "monday-ui-react-core/icons";
import TableEmptyState from "../TableEmptyState";
import TableErrorState from "../TableErrorState";
import { ITableColumn } from "monday-ui-react-core/dist/types/components/Table/Table/Table";
import TableFlag from "../RenderFlag";
import { IMondayItem, useMonday } from "../../context/MondayContext";
import { getColumn, getMapURL, parseTimezone } from "../../utils";
import { useModal } from "../../context/ModalContext";

export interface ITableProps {
  tableData: Array<IMondayItem>;
}

const tableColumns: Array<ITableColumn> = [
  {
    id: "flag",
    loadingStateType: "rectangle",
    title: "Flag",
    width: 60,
  },
  {
    id: "name",
    loadingStateType: "long-text",
    title: "Country Name",
    width: { min: 200, max: 400 },
  },
  {
    id: "timezone",
    loadingStateType: "medium-text",
    title: "Timezone",
  },
  {
    id: "gdp",
    loadingStateType: "medium-text",
    title: "GDP ($ per capita)",
  },
  {
    id: "currency",
    loadingStateType: "medium-text",
    title: "Currency",
  },
  {
    id: "maps",
    loadingStateType: "medium-text",
    title: "Map Location",
    width: 150,
  },
];

const Table = ({ tableData }: ITableProps) => {
  const { loading, hasError } = useMonday();
  const { openModalWithItem } = useModal();

  return (
    <Box scrollable style={{ height: "450px" }}>
      <MondayTable
        dataState={{
          isLoading: loading,
          isError: hasError,
        }}
        columns={tableColumns}
        emptyState={<TableEmptyState />}
        errorState={<TableErrorState />}
      >
        <TableHeader>
          {tableColumns?.map((col) => (
            <TableHeaderCell title={col.title} key={col.id} />
          ))}
        </TableHeader>
        <TableBody>
          {tableData?.map((data) => (
            <div
              onClick={() => {
                openModalWithItem(data);
              }}
              style={{ cursor: "pointer" }}
            >
              <TableRow key={data.id}>
                <TableCell>
                  <TableFlag text={getColumn(data, "iso2")} />
                </TableCell>

                <TableCell>
                  <Text>{data.name}</Text>
                </TableCell>

                <TableCell>
                  <Text>{parseTimezone(getColumn(data, "timezones"))}</Text>
                </TableCell>

                <TableCell>
                  <Text>{getColumn(data, "numbers7") || "-"}</Text>
                </TableCell>

                <TableCell>
                  <Text>
                    [{getColumn(data, "currency")}]{" "}
                    {getColumn(data, "currency_name")}
                  </Text>
                </TableCell>

                <TableCell>
                  <Link
                    href={getMapURL(data)}
                    text="Open Map"
                    target={Link.target.NEW_WINDOW}
                    icon={ExternalPage}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
              </TableRow>
            </div>
          ))}
        </TableBody>
      </MondayTable>
    </Box>
  );
};

export default Table;
