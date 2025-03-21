import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useUser } from "@clerk/clerk-react";

interface SavedStockType {
  isSideSheet: boolean;
  changeSideSheet: () => void;
}

const AppContext = createContext<SavedStockType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// This is the saved stock provider that holds all the functions and state
export const SavedStockProvider: React.FC<AppProviderProps> = ({
  children,
}) => {
  const [isSideSheet, setIsSideSheet] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log(user.id);
    }
  }, [user]);

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
