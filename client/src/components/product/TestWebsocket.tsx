import { useWebSocketContext } from "@/providers/websocketProvider";
import { useEffect, useRef } from "react";

const TestWebsocket = () => {
  const { receivedMessages, sentMessages } = useWebSocketContext();

  // Merge sent and received messages into a single array in the order they occur
  const mergedMessages = [];
  let sentIndex = 0;
  let receivedIndex = 0;

  // Combine messages in the order they were sent/received
  while (
    sentIndex < sentMessages.length ||
    receivedIndex < receivedMessages.length
  ) {
    if (sentIndex < sentMessages.length) {
      mergedMessages.push({ ...sentMessages[sentIndex], type: "sent" });
      sentIndex++;
    }
    if (receivedIndex < receivedMessages.length) {
      mergedMessages.push({
        ...receivedMessages[receivedIndex],
        type: "received",
      });
      receivedIndex++;
    }
  }

  // Auto-scroll to the bottom of the message list
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mergedMessages]);

  return (
    <div className="mt-20 h-[calc(100vh-12rem)] overflow-y-auto">
      <ul className="space-y-2 pb-4">
        {mergedMessages.map((msg, index) => (
          <li
            key={index}
            className={`flex ${
              msg.type === "sent" ? "justify-end" : "justify-start"
            }`}>
            <div className="bg-inputColor p-3 mx-4 rounded-xl max-w-[80%]">
              {msg.payload.message}
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />{" "}
        {/* Invisible element for auto-scrolling */}
      </ul>
    </div>
  );
};

export default TestWebsocket;
