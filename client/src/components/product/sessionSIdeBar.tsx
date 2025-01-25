import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SessionCard, SessionSkeletonCard } from "./cards/sessionCard";
import { useEffect, useState } from "react"; // Import useEffect and useState

const SessionSideBar = () => {
  const [currentPath, setCurrentPath] = useState(""); // State to store the current path

  // Use useEffect to safely access window.location on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname); // Get the current URL path
    }
  }, []);

  // Log the current path for debugging
  console.log("Current URL Path:", currentPath.length);

  if (currentPath.length > 10) {
    return null
  }

  return (
    <Sidebar className="bg-secondaryColor text-textColor border-r-borderColor">
      <SidebarHeader className="items-center text-xl border-b-[1px] border-b-borderColor p-[22px] font-semibold">
        Sessions
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        {/* Display the current path */}
        <p>Current Path: {currentPath}</p>
      </SidebarContent>
    </Sidebar>
  );
};

export default SessionSideBar;