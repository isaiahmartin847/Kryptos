"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useParams } from "next/navigation";

const SessionPage = () => {
  const { sessionID } = useParams();

  if (!sessionID) {
    return <div>Loading...</div>;
  }

  return (
    <ResizablePanelGroup
    direction="horizontal"
    className="w-screen h-screen">
      <ResizablePanel defaultSize={50} className=""></ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} className="bg-secondaryColor"></ResizablePanel>

    </ResizablePanelGroup>
  );
};

export default SessionPage;
