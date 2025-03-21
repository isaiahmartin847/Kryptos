import React, { createContext, ReactNode, useContext } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSavedStocks } from "@/apiFunctions/getFunctions";
import { SavedStock } from "@/types/stocks";
import { ApiResponse } from "@/types/requestBody";

interface SavedStockType {
  savedStocksData: ApiResponse<SavedStock> | undefined;
  isSavedStockLoading: boolean;
  isSavedStockError: boolean;
}

const AppContext = createContext<SavedStockType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// This is the saved stock provider that holds all the functions and state
export const SavedStockProvider: React.FC<AppProviderProps> = ({
  children,
}) => {
  const { user } = useUser();

  const {
    data: savedStocksData,
    isLoading: isSavedStockLoading,
    isError: isSavedStockError,
  } = useQuery({
    queryKey: ["savedStocks", user?.id],
    queryFn: () => {
      if (!user?.id) {
        throw new Error("User is not authenticated");
      }
      return fetchSavedStocks(user.id);
    },
    enabled: !!user?.id,
  });

  return (
    <AppContext.Provider
      value={{
        isSavedStockError,
        isSavedStockLoading,
        savedStocksData,
      }}
    >
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
