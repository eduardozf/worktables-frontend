import { Bullets, Table as TableIcon, Group } from "monday-ui-react-core/icons";
import { Flex, Tab, Text } from "monday-ui-react-core";
import SearchBar from "../SearchBar";
import { useToolbar } from "../../context/ToolbarContext";

export type TabsName = "list" | "table" | "card";

const Toolbar = () => {
  const { activeTab, handleTabChange } = useToolbar();
  return (
    <Flex justify={Flex.justify.SPACE_BETWEEN} align={Flex.align.BASELINE}>
      <Flex align={Flex.align.CENTER}>
        <Tab
          icon={Bullets}
          active={activeTab === "list"}
          onClick={() => handleTabChange("list")}
        >
          <Text>List</Text>
        </Tab>
        <Tab
          icon={TableIcon}
          active={activeTab === "table"}
          onClick={() => handleTabChange("table")}
        >
          <Text>Table</Text>
        </Tab>
        <Tab
          icon={Group}
          active={activeTab === "card"}
          onClick={() => handleTabChange("card")}
        >
          <Text>Cards</Text>
        </Tab>
      </Flex>

      <Flex>
        <SearchBar />
      </Flex>
    </Flex>
  );
};

export default Toolbar;
