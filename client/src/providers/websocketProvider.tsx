import React, { createContext, useContext, useState, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

// Define the shape of the context
interface WebSocketContextType {
  sendMessage: (message: string) => void;
  receivedMessages: string[];
  isConnected: boolean;
  connectionStatus: string;
  isLoading: boolean; // Added for loading state
}

// Create the context
const WebSocketContext = createContext<WebSocketContextType | null>(null);

// Custom hook to use the WebSocket context
export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
};

// WebSocket Provider component
export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  // const WS_URL = process.env.NEXT_PUBLIC_WS_API_URL;
  const WS_URL = "http://localhost:5000/ws";

  if (!WS_URL) {
    throw new Error("websocket url didn't load in");
  }

  const { sendMessage, readyState } = useWebSocket(WS_URL, {
    onMessage: (message) => {
      setReceivedMessages((prev) => [...prev, message.data]);
    },
    shouldReconnect: () => true,
  });

  // Connection status
  const connectionStatus = useMemo(() => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        return "Connecting";
      case ReadyState.OPEN:
        return "Connected";
      case ReadyState.CLOSING:
        return "Closing";
      case ReadyState.CLOSED:
        return "Disconnected";
      default:
        return "Unknown";
    }
  }, [readyState]);

  // Loading state: true when connecting, false otherwise
  const isLoading = useMemo(
    () => readyState === ReadyState.CONNECTING,
    [readyState]
  );

  const value = useMemo(
    () => ({
      sendMessage,
      receivedMessages,
      isConnected: readyState === ReadyState.OPEN,
      connectionStatus,
      isLoading, // Add loading state to the context value
    }),
    [sendMessage, receivedMessages, readyState, connectionStatus, isLoading]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
