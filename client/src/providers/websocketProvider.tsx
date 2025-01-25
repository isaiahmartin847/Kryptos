import React, { createContext, useContext, useState, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

// Define the shape of the context
interface WebSocketContextType {
  sendMessage: (message: string) => void;
  receivedMessages: string[];
  isConnected: boolean;
  connectionStatus: string;
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

  // Replace with your WebSocket server URL
  const WS_URL = "ws://localhost:8080";

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

  const value = useMemo(
    () => ({
      sendMessage,
      receivedMessages,
      isConnected: readyState === ReadyState.OPEN,
      connectionStatus,
    }),
    [sendMessage, receivedMessages, readyState, connectionStatus]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
