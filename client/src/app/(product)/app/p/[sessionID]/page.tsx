"use client";

import SendMessageForm from "@/components/product/forms/sendMessageForm";
import TestWebsocket from "@/components/product/TestWebsocket";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WebSocketProvider } from "@/providers/websocketProvider";
import { useParams } from "next/navigation";

const SessionPage = () => {
  const { sessionID } = useParams();

  if (!sessionID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-75px)]">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-screen h-full border-2 border-red-500">
        <ResizablePanel
          defaultSize={50}
          className="">
          <WebSocketProvider>
            <TestWebsocket></TestWebsocket>
            <SendMessageForm />
          </WebSocketProvider>
        </ResizablePanel>
        <ResizableHandle className="bg-mutedColor w-[.7px]" />
        <ResizablePanel
          defaultSize={50}
          className=""></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SessionPage;
