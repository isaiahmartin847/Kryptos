import React, { createContext, ReactNode, useContext, useState } from "react";

interface StocksType {
  test: boolean;
}

interface StocksProviderProps {
  children: ReactNode;
}

const StockContext = createContext<StocksType | undefined>(undefined);

export const StocksProvider: React.FC<StocksProviderProps> = ({ children }) => {
  const [test, isTest] = useState<boolean>(true);

  return (
    <StockContext.Provider value={{ test }}>{children}</StockContext.Provider>
  );
};

export const useStocks = (): StocksType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useSavedStocks must be used within an AppProvider");
  }
  return context;
};
