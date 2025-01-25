"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
          className=""></ResizablePanel>
        <ResizableHandle className="bg-mutedColor w-[.7px]" />
        <ResizablePanel
          defaultSize={50}
          className=""></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SessionPage;
