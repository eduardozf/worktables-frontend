import { createContext, useContext, useState, useCallback } from "react";
import { Box, Flex, Toast } from "monday-ui-react-core";

interface IToast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface ToastContextProps {
  toasts: IToast[];
  addToast: (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => void;
  removeToast: (id: string) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

// Generate a unique ID
const generateId = () => "_" + Math.random().toString(36).slice(2, 9);

// Handles toast actions
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback(
    (message: string, type: "success" | "error" | "info" | "warning") => {
      const id = generateId();
      const newToast = { id, message, type };
      setToasts((prevToasts) => [...prevToasts, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <Box className="toast-container">
        {toasts.map((toast) => (
          <Toast
            className="toast"
            key={toast.id}
            open
            type={
              toast.type === "success"
                ? Toast.types.POSITIVE
                : toast.type === "error"
                ? Toast.types.NEGATIVE
                : toast.type === "info"
                ? Toast.types.NORMAL
                : Toast.types.WARNING
            }
            autoHideDuration={5000}
            onClose={() => removeToast(toast.id)}
          >
            {toast.message}
          </Toast>
        ))}
      </Box>
      {children}
    </ToastContext.Provider>
  );
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
