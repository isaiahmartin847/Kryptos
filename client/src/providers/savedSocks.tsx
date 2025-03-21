import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the context and its type
interface SavedStockType {
  isSideSheet: boolean;
  changeSideSheet: () => void;
}

// Create the context with a default value
const AppContext = createContext<SavedStockType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isSideSheet, setIsSideSheet] = useState<boolean>(false);

  const changeSideSheet = () => {
    setIsSideSheet(!isSideSheet);
  };

  return (
    <AppContext.Provider value={{ isSideSheet, changeSideSheet }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useSavedStocks = (): SavedStockType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useSavedStocks must be used within an AppProvider");
  }
  return context;
};
