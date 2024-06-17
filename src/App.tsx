import { Flex, Box } from "monday-ui-react-core";
import AppHeader from "./components/AppHeader";
import Toolbar from "./components/Toolbar";
import ContentViewer from "./components/ContentViewer";
import { ToolbarProvider } from "./context/ToolbarContext";
import { MondayProvider } from "./context/MondayContext";

function App() {
  return (
    <MondayProvider>
      <Box paddingX={Box.paddingXs.XL}>
        <Flex
          direction={Flex.directions.COLUMN}
          gap={Flex.gaps.LARGE}
          align={Flex.align.STRETCH}
        >
          <AppHeader />
          <ToolbarProvider>
            <Toolbar />
            <ContentViewer />
          </ToolbarProvider>
        </Flex>
      </Box>
    </MondayProvider>
  );
}

export default App;
