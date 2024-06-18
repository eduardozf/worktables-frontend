import { createContext, useContext, useState } from "react";
import { IMondayItem } from "./MondayContext";

// Atualização do contexto do modal
interface ModalContextProps {
  isModalOpen: boolean;
  isModalLoading: boolean;
  selectedItem?: IMondayItem;
  openModalWithItem: (item: IMondayItem) => void;
  closeModal: () => void;
  changeLoad: (state: boolean) => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

// Handles modal actions
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IMondayItem | undefined>(
    undefined
  );

  const openModalWithItem = (item: any) => {
    setSelectedItem(item);
    setIsModalLoading(isModalLoading);
    setIsModalOpen(true);
  };

  const changeLoad = (state: boolean) => {
    setIsModalLoading(state);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        isModalLoading,
        selectedItem,
        openModalWithItem,
        closeModal,
        changeLoad,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
