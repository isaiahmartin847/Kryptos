import { fetchStocks } from "@/apiFunctions/getFunctions";
import { saveStock } from "@/apiFunctions/postFunctions";
import { ApiResponse } from "@/types/requestBody";
import { Stock } from "@/types/stocks";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface StocksType {
  stocks: ApiResponse<Stock> | undefined;
  mutateSaveStock: (stockId: number) => void;
  isStocksLoading: boolean;
  isStocksError: boolean;
}

interface StocksProviderProps {
  children: ReactNode;
}

const StockContext = createContext<StocksType | undefined>(undefined);

export const StocksProvider: React.FC<StocksProviderProps> = ({ children }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

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

  const { mutate: mutateSaveStock } = useMutation({
    mutationFn: (stockId: number) => {
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        return saveStock(user.id, stockId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    },
  });

  return (
    <StockContext.Provider
      value={{ stocks, isStocksLoading, isStocksError, mutateSaveStock }}
    >
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
