import { deleteSavedStock } from "@/apiFunctions/DeleteFunctions";
import { fetchStocks } from "@/apiFunctions/getFunctions";
import { saveStock } from "@/apiFunctions/postFunctions";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/requestBody";
import { Stock } from "@/types/stocks";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";

interface StocksType {
  stocks: ApiResponse<Stock> | undefined;
  mutateSaveStock: (stockId: number) => void;
  mutateRemoveSavedStock: (savedStockId: number) => void;
  refetchStocks: () => void;
  savedStocks: Stock[];
  isStocksLoading: boolean;
  isStocksError: boolean;
  isSaveStockPending: boolean;
}

interface StocksProviderProps {
  children: ReactNode;
}

const StockContext = createContext<StocksType | undefined>(undefined);

export const StocksProvider: React.FC<StocksProviderProps> = ({ children }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: stocks,
    isLoading: isStocksLoading,
    isError: isStocksError,
    refetch: refetchStocks,
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

  const { mutate: mutateSaveStock, isPending: isSaveStockPending } =
    useMutation({
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
      onError: (error: Error) => {
        toast({
          title: "Failed to save stock",
          description: `Error: ${error.message}`,
          variant: "error",
        });
      },
    });

  const { mutate: mutateRemoveSavedStock } = useMutation({
    mutationFn: (savedStockId: number) => {
      return deleteSavedStock(savedStockId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save stock",
        description: `Error: ${error.message}`,
        variant: "error",
      });
    },
  });

  const savedStocks =
    stocks?.data.items.filter((stock) => stock.is_saved) || [];

  return (
    <StockContext.Provider
      value={{
        stocks,
        savedStocks,
        isStocksLoading,
        isStocksError,
        refetchStocks,
        isSaveStockPending,
        mutateSaveStock,
        mutateRemoveSavedStock,
      }}
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
