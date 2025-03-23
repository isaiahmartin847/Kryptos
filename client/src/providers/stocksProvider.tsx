import { fetchStocks } from "@/apiFunctions/getFunctions";
import { ApiResponse } from "@/types/requestBody";
import { Stock } from "@/types/stocks";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface StocksType {
  stocks: ApiResponse<Stock> | undefined;
  isStocksLoading: boolean;
  isStocksError: boolean;
}

interface StocksProviderProps {
  children: ReactNode;
}

const StockContext = createContext<StocksType | undefined>(undefined);

export const StocksProvider: React.FC<StocksProviderProps> = ({ children }) => {
  const [test, isTest] = useState<boolean>(true);
  const { user } = useUser();

  const {
    data: stocks,
    isLoading: isStocksLoading,
    isError: isStocksError,
  } = useQuery({
    queryKey: ["stocks"],
    queryFn: () => {
      if (!user?.id) {
        return fetchStocks("");
      } else {
        return fetchStocks(user.id);
      }
    },
    enabled: !!user?.id,
  });

  return (
    <StockContext.Provider value={{ stocks, isStocksLoading, isStocksError }}>
      {children}
    </StockContext.Provider>
  );
};

// This is the useHook
export const useStocks = (): StocksType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useSavedStocks must be used within an AppProvider");
  }
  return context;
};
