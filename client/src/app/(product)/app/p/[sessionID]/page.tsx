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
        className="w-screen h-full">
        <ResizablePanel
          defaultSize={50}
          className=""></ResizablePanel>
        <ResizableHandle className="bg-mutedColor w-[.7px]" />
        <ResizablePanel
          defaultSize={50}
          className="">
          <WebSocketProvider>
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <TestWebsocket />
              </div>
              <div className="p-4">
                <SendMessageForm />
              </div>
            </div>
          </WebSocketProvider>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SessionPage;
