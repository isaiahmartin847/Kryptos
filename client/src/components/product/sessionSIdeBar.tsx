import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SessionCard, SessionSkeletonCard } from "./cards/sessionCard";
import { usePathname } from "next/navigation";

const SessionSideBar = () => {
  const pathname = usePathname()

  if(pathname.slice(1, 2) === "p") {
    return null
  }

  return (
    <Sidebar className="bg-secondaryColor text-textColor border-r-borderColor">
      <SidebarHeader className="items-center text-xl border-b-[1px] border-b-borderColor p-[22px] font-semibold">
        Sessions
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">

      </SidebarContent>
    </Sidebar>
  );
};

export default SessionSideBar;