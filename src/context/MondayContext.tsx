import React, { createContext, useContext, useEffect, useState } from "react";
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
}

const mondaySDK = mondaySdk();
mondaySDK.setApiVersion("2024-04");

export const MondayProvider: React.FC<MondayProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [boardData, setData] = useState<Array<IMondayItem>>([]);
  const [context, setContext] = useState<AppFeatureBoardViewContext | null>(
    null
  );
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const maxRows = 5;

  const getBoardID = async () => {
    const id = context?.boardId;
    if (id) return id;

    const res: any = await mondaySDK.get("context");
    return res.data.boardId;
  };

  const getDataFromMondayBoard = async (query: string) => {
    try {
      const boardId = await getBoardID();
      if (!boardId) return;

      setHasError(false);
      setLoading(true);
      const hasQuery = query?.length;

      const limit = `limit: ${maxRows}`;
      const cursor = `cursor: "${nextCursor}"`;
      const filter = `query_params: { rules: [{ column_id: "name", compare_value: "${query}", operator: contains_text }], operator: and }`;

      const parameters = [limit];

      // if (nextCursor && !hasQuery) parameters.push(cursor);
      if (hasQuery) parameters.push(filter);

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
      console.log({ response });

      setNextCursor(response.data.boards[0].items_page.cursor);
      setData(response.data.boards[0].items_page.items);
      setLoading(false);
    } catch (error: any) {
      setHasError(true);
      setLoading(false);
      console.trace(error);
    }
  };

  useEffect(() => {
    // Every time monday context change it will update the state
    mondaySDK.listen("context", (res) =>
      setContext(res.data as AppFeatureBoardViewContext)
    );
  }, []);

  useEffect(() => {
    getDataFromMondayBoard("");
  }, []);

  return (
    <MondayContext.Provider
      value={{ boardData, getDataFromMondayBoard, loading, hasError }}
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
    throw new Error("useMonday must be inside a MondayProvider");
  }
  return context;
};
