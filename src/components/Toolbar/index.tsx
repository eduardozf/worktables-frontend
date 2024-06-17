import { Bullets, Table as TableIcon } from "monday-ui-react-core/icons";
import { Flex, Tab, Text } from "monday-ui-react-core";
import SearchBar from "../SearchBar";
import { useToolbar } from "../../context/ToolbarContext";

export type TabsName = "list" | "table";

const Toolbar = () => {
  const { activeTab, handleTabChange } = useToolbar();
  return (
    <Flex justify={Flex.justify.SPACE_BETWEEN} align={Flex.align.BASELINE}>
      <Flex align={Flex.align.CENTER}>
        <Tab
          icon={TableIcon}
          active={activeTab === "table"}
          onClick={() => handleTabChange("table")}
        >
          <Text>Table</Text>
        </Tab>
        <Tab
          icon={Bullets}
          active={activeTab === "list"}
          onClick={() => handleTabChange("list")}
        >
          <Text>List</Text>
        </Tab>
      </Flex>

      <Flex>
        <SearchBar />
      </Flex>
    </Flex>
  );
};

export default Toolbar;
