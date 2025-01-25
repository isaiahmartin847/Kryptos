import { useWebSocketContext } from "@/providers/websocketProvider";
import { useState } from "react";

const TestWebsocket = () => {
  const { sendMessage, receivedMessages, isConnected, connectionStatus } =
    useWebSocketContext();
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSendMessage = () => {
    // Set loading to true when sending the message
    setLoading(true);

    // Create the message payload
    const message = {
      type: "echo",
      payload: {
        role: "user",
        message: "hello",
      },
    };

    // Send the message as a JSON string
    sendMessage(JSON.stringify(message));

    setLoading(false);
  };

  return (
    <div>
      <div>Connection Status: {connectionStatus}</div>
      <div>Connected: {isConnected ? "Yes" : "No"}</div>

      <button
        onClick={handleSendMessage}
        disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>

      <div>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestWebsocket;
