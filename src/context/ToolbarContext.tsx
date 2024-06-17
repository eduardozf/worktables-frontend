import React, { createContext, useContext, useEffect, useState } from "react";
import { TabsName } from "../components/Toolbar";
import { useMonday } from "./MondayContext";

interface ToolbarProviderProps {
  children: React.ReactNode;
}

interface ToolbarContextProps {
  activeTab: TabsName;
  handleSearch: (query: string) => void;
  handleTabChange: (tabName: TabsName) => void;
}

export const ToolbarProvider: React.FC<ToolbarProviderProps> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabsName>("table");
  const { getDataFromMondayBoard } = useMonday();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTabChange = (tabName: TabsName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    getDataFromMondayBoard(searchQuery);
  }, [searchQuery]);

  return (
    <ToolbarContext.Provider
      value={{ activeTab, handleSearch, handleTabChange }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

const ToolbarContext = createContext<ToolbarContextProps | undefined>(
  undefined
);

export const useToolbar = (): ToolbarContextProps => {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbar must be inside a ToolbarProvider");
  }
  return context;
};
