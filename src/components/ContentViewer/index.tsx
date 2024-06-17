import { Box } from "monday-ui-react-core";
import Table from "../Table";
import { ITableColumn } from "monday-ui-react-core/dist/types/components/Table/Table/Table";
import { useMonday } from "../../context/MondayContext";
import { useToolbar } from "../../context/ToolbarContext";
import { TabsName } from "../Toolbar";

const ContentViewer = () => {
  const { boardData } = useMonday();
  const { activeTab } = useToolbar();

  const typeOfView: { [key in TabsName]: React.ReactElement } = {
    list: <>aa</>,
    table: <Table tableData={boardData} />,
    card: <>bb</>,
  };

  return <Box style={{ overflow: "visible" }}>{typeOfView[activeTab]}</Box>;
};

export default ContentViewer;
