import { ResponseMessage } from "@/types/websocket";
import React, { createContext, useContext, useState, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

// Define the shape of the context
interface WebSocketContextType {
  sendMessage: (message: SendMessage) => void;
  sentMessages: SendMessage[];
  receivedMessages: ResponseMessage[];
  isConnected: boolean;
  connectionStatus: string;
  isLoading: boolean;
}

// Define the shape of the `SendMessage` type
interface SendMessage {
  type: string;
  payload: {
    role: string;
    message: string;
  };
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
  const [receivedMessages, setReceivedMessages] = useState<ResponseMessage[]>(
    []
  );
  const [sentMessages, setSentMessages] = useState<SendMessage[]>([]);

  const WS_URL = "http://localhost:5000/ws";

  if (!WS_URL) {
    throw new Error("WebSocket URL is not defined");
  }

  const { sendMessage: originalSendMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onMessage: (message) => {
        try {
          // Parse the message as ResponseMessage
          const parsedMessage: ResponseMessage = JSON.parse(message.data);
          setReceivedMessages((prev) => [...prev, parsedMessage]);
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      },
      shouldReconnect: () => true,
    }
  );

  // Wrapper for sendMessage to store sent messages
  const sendMessage = (message: SendMessage) => {
    setSentMessages((prev) => [...prev, message]);
    originalSendMessage(JSON.stringify(message));
  };

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

  const isLoading = useMemo(
    () => readyState === ReadyState.CONNECTING,
    [readyState]
  );

  const value = useMemo(
    () => ({
      sendMessage,
      sentMessages,
      receivedMessages,
      isConnected: readyState === ReadyState.OPEN,
      connectionStatus,
      isLoading,
    }),
    [
      sendMessage,
      sentMessages,
      receivedMessages,
      readyState,
      connectionStatus,
      isLoading,
    ]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
