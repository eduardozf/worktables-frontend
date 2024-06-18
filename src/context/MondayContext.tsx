import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import mondaySdk from "monday-sdk-js";
import { AppFeatureBoardViewContext } from "monday-sdk-js/types/client-context.type";
import { ThemeProvider } from "monday-ui-react-core";
import { SystemTheme } from "monday-ui-react-core/dist/types/components/ThemeProvider/ThemeProviderConstants";

interface MondayProviderProps {
  children: React.ReactNode;
}

export interface IMondayItem {
  id: string;
  name: string;
  column_values: Array<{ id: string; text: string }>;
}

interface MondayContextProps {
  boardData: Array<IMondayItem>;
  getDataFromMondayBoard: (query: string) => void;
  loading: boolean;
  hasError: boolean;
  hasPrevPage: boolean;
  noMorePages: boolean;
  getNextPage: () => void;
  getPrevPage: () => void;
}

const mondaySDK = mondaySdk();
mondaySDK.setApiVersion("2024-04");

// Handles mondaySDK actions
export const MondayProvider: React.FC<MondayProviderProps> = ({ children }) => {
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [boardData, setData] = useState<Array<IMondayItem>>([]);
  const [context, setContext] = useState<
    AppFeatureBoardViewContext | undefined
  >(undefined);

  // Pages
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined
  );
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [prevCursors, setPrevCursors] = useState<Array<string | undefined>>([]);
  const [noMorePages, setNoMorePages] = useState<boolean>(false);

  const maxRows = 30;

  const getBoardID = async () => {
    const id = context?.boardId;
    if (id) return id;

    const res: any = await mondaySDK.get("context");
    return res?.data?.boardId;
  };

  const getDataFromMondayBoard = useCallback(
    async (query?: string, cursor?: string) => {
      try {
        const boardId = await getBoardID();
        if (!boardId) return;

        setHasError(false);
        setLoading(true);
        setCurrentQuery(query);
        const hasQuery = query?.length;

        const limit = `limit: ${maxRows}`;
        const cursorParam = `cursor: "${cursor}"`;
        const filter = `query_params: { rules: [{ column_id: "name", compare_value: "${query}", operator: contains_text }], operator: and }`;

        const parameters = [limit];

        if (cursor) parameters.push(cursorParam);
        if (hasQuery && !cursor) parameters.push(filter);
        const fullQuery = `
      query { 
        boards(ids: ${boardId}) { 
          id 
          name 
          items_page(${parameters}) { 
            cursor 
            items { 
              id 
              name 
              column_values { 
                id 
                text 
              } 
            }
          }
        }
      }
      `;

        const response = await mondaySDK.api(fullQuery);

        // Set cursor states
        const responseCursor = response?.data?.boards?.[0]?.items_page?.cursor;
        if (!responseCursor) setNoMorePages(true);
        else setNoMorePages(false);

        setNextCursor(responseCursor);
        setCurrentCursor(cursor);

        // Set data states
        setData(response.data.boards[0].items_page.items);
        setLoading(false);
      } catch (error: any) {
        setHasError(true);
        setLoading(false);
        console.trace(error);
      }
    },
    [context, maxRows]
  );

  const getNextCursor = () => {
    if (!nextCursor) return;

    // Set current cursor so we can use later
    setPrevCursors((data) => [currentCursor, ...data]);

    // Get data from cursor
    getDataFromMondayBoard(currentQuery, nextCursor);
  };

  const getPrevCursor = () => {
    const goToCursor = prevCursors.shift();

    // If ended, get data from query
    if (!goToCursor) return getDataFromMondayBoard(currentQuery, undefined);

    // Get data from cursor
    getDataFromMondayBoard(currentQuery, goToCursor);

    // Update current cursor
    setCurrentCursor(goToCursor);

    // Remove goToCursor from previous cursor list
    setPrevCursors([...prevCursors]);
  };

  useEffect(() => {
    // Every time monday context change it will update the state
    mondaySDK.listen("context", (res) =>
      setContext(res.data as AppFeatureBoardViewContext)
    );
  }, []);

  return (
    <MondayContext.Provider
      value={{
        boardData,
        getDataFromMondayBoard,
        loading,
        hasError,
        noMorePages,
        hasPrevPage: !!prevCursors?.length,
        getNextPage: getNextCursor,
        getPrevPage: getPrevCursor,
      }}
    >
      <ThemeProvider
        themeConfig={context?.themeConfig}
        systemTheme={context?.theme as SystemTheme}
      >
        <>{children}</>
      </ThemeProvider>
    </MondayContext.Provider>
  );
};

const MondayContext = createContext<MondayContextProps | undefined>(undefined);

export const useMonday = (): MondayContextProps => {
  const context = useContext(MondayContext);
  if (!context) {
    throw new Error("useMonday must be used within a MondayProvider");
  }
  return context;
};
