"use client";

import { createContext, ReactNode, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveStock } from "@/apiFunctions/postFunctions";
import { deleteSavedStock } from "@/apiFunctions/DeleteFunctions";
import { fetchSavedStocks } from "@/apiFunctions/getFunctions";
import { useToast } from "@/hooks/use-toast";
import { SavedStock } from "@/types/stocks";
import { ApiResponse } from "@/types/requestBody";
import { useUser } from "@clerk/nextjs";

interface SavedStocksType {
  savedStocks: SavedStock[] | undefined;
  mutateSaveStock: (stockId: number) => void;
  mutateRemoveSavedStock: (savedStockId: number) => void;
  refetchSavedStocks: () => void;
  isSavedStocksLoading: boolean;
  isSavedStocksError: boolean;
  isSaveStockPending: boolean;
}

interface SavedStocksProviderProps {
  children: ReactNode;
}

const SavedStocksContext = createContext<SavedStocksType | undefined>(undefined);

export const SavedStocksProvider: React.FC<SavedStocksProviderProps> = ({ children }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch saved stocks data with React Query
  const {
    data: savedStocksResponse,
    isLoading: isSavedStocksLoading,
    isError: isSavedStocksError,
    refetch: refetchSavedStocks,
  } = useQuery<ApiResponse<SavedStock>>({
    queryKey: ["savedStocks", user?.id],
    queryFn: () => {
      if (!user?.id) {
        throw new Error("User ID is required to fetch saved stocks.");
      }
      return fetchSavedStocks(user.id);
    },
    enabled: !!user?.id,
    staleTime: 0, // Always consider data stale to ensure fresh data
    refetchInterval: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const savedStocks = savedStocksResponse?.data.items;

  // Mutation for saving a stock
  const { mutate: mutateSaveStock, isPending: isSaveStockPending } = useMutation({
    mutationFn: (stockId: number) => {
      if (!user?.id) {
        throw new Error("User is not authenticated");
      }
      return saveStock(user.id, stockId);
    },
    onMutate: async (stockId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["savedStocks", user?.id] });

      // Snapshot the previous value
      const previousStocks = queryClient.getQueryData<ApiResponse<SavedStock>>(["savedStocks", user?.id]);

      // Optimistically update to the new value
      if (previousStocks) {
        queryClient.setQueryData<ApiResponse<SavedStock>>(["savedStocks", user?.id], {
          ...previousStocks,
          data: {
            ...previousStocks.data,
            items: [...previousStocks.data.items, { id: stockId } as SavedStock],
          },
        });
      }

      return { previousStocks };
    },
    onError: (err, variables, context) => {
      // Rollback to the previous value on error
      if (context?.previousStocks) {
        queryClient.setQueryData(["savedStocks", user?.id], context.previousStocks);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["savedStocks", user?.id] });
    },
    onSuccess: () => {
      toast({
        title: "Saved stock",
        variant: "default",
      });
    },
  });

  // Mutation for removing a saved stock
  const { mutate: mutateRemoveSavedStock } = useMutation({
    mutationFn: (savedStockId: number) => {
      return deleteSavedStock(savedStockId);
    },
    onMutate: async (savedStockId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["savedStocks", user?.id] });

      // Snapshot the previous value
      const previousStocks = queryClient.getQueryData<ApiResponse<SavedStock>>(["savedStocks", user?.id]);

      // Optimistically update to the new value
      if (previousStocks) {
        queryClient.setQueryData<ApiResponse<SavedStock>>(["savedStocks", user?.id], {
          ...previousStocks,
          data: {
            ...previousStocks.data,
            items: previousStocks.data.items.filter(stock => stock.id !== savedStockId),
          },
        });
      }

      return { previousStocks };
    },
    onError: (err, variables, context) => {
      // Rollback to the previous value on error
      if (context?.previousStocks) {
        queryClient.setQueryData(["savedStocks", user?.id], context.previousStocks);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["savedStocks", user?.id] });
    },
    onSuccess: () => {
      toast({
        title: "Unsaved stock",
        variant: "default",
      });
    },
  });

  return (
    <SavedStocksContext.Provider
      value={{
        savedStocks,
        isSavedStocksLoading,
        isSavedStocksError,
        refetchSavedStocks,
        isSaveStockPending,
        mutateSaveStock,
        mutateRemoveSavedStock,
      }}
    >
      {children}
    </SavedStocksContext.Provider>
  );
};

// Custom hook to access saved stocks context
export const useSavedStocks = (): SavedStocksType => {
  const context = useContext(SavedStocksContext);
  if (!context) {
    throw new Error("useSavedStocks must be used within a SavedStocksProvider");
  }
  return context;
};
