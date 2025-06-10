import { createContext, ReactNode, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveStock } from "@/apiFunctions/postFunctions";
import { deleteSavedStock } from "@/apiFunctions/DeleteFunctions";
import { fetchStocks } from "@/apiFunctions/getFunctions";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/requestBody";
import { Stock } from "@/types/stocks";
import { useUser } from "@clerk/nextjs";

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
  } = useQuery<ApiResponse<Stock>>({
    queryKey: ["stocks", user?.id],
    queryFn: () => {
      if (!user?.id) {
        throw new Error("User ID is required to fetch stocks.");
      }
      return fetchStocks(user.id);
    },
    enabled: !!user?.id,
    refetchInterval: 10000 * 60,
  });

  // Mutation for saving a stock
  const { mutate: mutateSaveStock, isPending: isSaveStockPending } =
    useMutation({
      mutationFn: (stockId: number) => {
        if (!user?.id) {
          throw new Error("User is not authenticated");
        }
        return saveStock(user.id, stockId);
      },
      onMutate: async (stockId: number) => {
        await queryClient.cancelQueries({ queryKey: ["stocks", user?.id] });

        const previousStocks = queryClient.getQueryData<ApiResponse<Stock>>([
          "stocks",
          user?.id,
        ]);

        queryClient.setQueryData<ApiResponse<Stock>>(
          ["stocks", user?.id],
          (old) => {
            if (old) {
              return {
                ...old,
                data: {
                  ...old.data,
                  items: old.data.items.map((stock) =>
                    stock.id === stockId ? { ...stock, is_saved: true } : stock,
                  ),
                },
              };
            }
            return old;
          },
        );

        return { previousStocks };
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(["stocks", user?.id], context?.previousStocks);
      },
      onSettled: () => {
        queryClient.refetchQueries({ queryKey: ["stocks", user?.id] });
      },
    });

  // Mutation for removing a saved stock
  const { mutate: mutateRemoveSavedStock } = useMutation({
    mutationFn: (savedStockId: number) => {
      return deleteSavedStock(savedStockId);
    },
    onMutate: async (savedStockId: number) => {
      await queryClient.cancelQueries({ queryKey: ["stocks", user?.id] });

      const previousStocks = queryClient.getQueryData<ApiResponse<Stock>>([
        "stocks",
        user?.id,
      ]);

      queryClient.setQueryData<ApiResponse<Stock>>(
        ["stocks", user?.id],
        (old) => {
          if (old) {
            return {
              ...old,
              data: {
                ...old.data,
                items: old.data.items.map((stock) => {
                  const hasSavedStock = stock.saved_stocks?.some(
                    (savedStock) => savedStock.id === savedStockId,
                  );

                  if (hasSavedStock) {
                    return {
                      ...stock,
                      is_saved: false,
                      saved_stocks: stock.saved_stocks?.filter(
                        (savedStock) => savedStock.id !== savedStockId,
                      ),
                    };
                  }
                  return stock;
                }),
              },
            };
          }
          return old;
        },
      );

      return { previousStocks };
    },
    onError: (error: Error, variables, context) => {
      queryClient.setQueryData(["stocks", user?.id], context?.previousStocks);

      toast({
        title: "Failed to delete stock",
        description: `Error: ${error.message}`,
        variant: "error",
      });
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["stocks", user?.id] });
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

// Add this hook export that was missing:
export const useStocks = (): StocksType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStocks must be used within a StocksProvider");
  }
  return context;
};
