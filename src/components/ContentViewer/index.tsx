import { Box } from "monday-ui-react-core";
import Table from "../Table";
import { useMonday } from "../../context/MondayContext";
import { useToolbar } from "../../context/ToolbarContext";
import { TabsName } from "../Toolbar";
import ListView from "../ListView";
import { ModalProvider } from "../../context/ModalContext";
import CountryModal from "../CountryModal";

const ContentViewer = () => {
  const { boardData } = useMonday();
  const { activeTab } = useToolbar();

  const typeOfView: { [key in TabsName]: () => React.ReactElement } = {
    table: () => <Table tableData={boardData} />,
    list: () => <ListView listData={boardData} />,
  };

  return (
    <ModalProvider>
      <CountryModal />
      <Box style={{ overflow: "visible" }}>{typeOfView[activeTab]()}</Box>
    </ModalProvider>
  );
};

export default ContentViewer;
