import { Box, Flex, List, ListItem, Text } from "monday-ui-react-core";
import { IMondayItem } from "../../context/MondayContext";
import TableEmptyState from "../TableEmptyState";
import RenderFlag from "../RenderFlag";
import { getColumn } from "../../utils";
import { useModal } from "../../context/ModalContext";

interface IListViewProps {
  listData: Array<IMondayItem>;
}

const ListView = ({ listData }: IListViewProps) => {
  const { openModalWithItem } = useModal();

  return (
    <>
      {listData?.length ? (
        <Box
          scrollable
          style={{ height: "425px" }}
          border={Box.borders.DEFAULT}
          rounded={Box.roundeds.SMALL}
        >
          {listData?.map((item, index) => (
            <List
              renderOnlyVisibleItems
              style={{
                height: "50px",
                width: "100%",
              }}
              className={index % 2 !== 0 ? "bgIndex" : ""}
            >
              <ListItem
                onClick={() => {
                  openModalWithItem(item);
                }}
              >
                <Flex gap={Flex.gaps.SMALL}>
                  <RenderFlag text={getColumn(item, "iso2")} />
                  <Text>{item.name}</Text>
                </Flex>
              </ListItem>
            </List>
          ))}
        </Box>
      ) : (
        <TableEmptyState />
      )}
    </>
  );
};

export default ListView;
