import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SessionCard from "./cards/sessionCard";

const SessionSideBar = () => {
  return (
    <Sidebar className="bg-secondaryColor text-textColor border-r-borderColor">
      <SidebarHeader className="items-center text-xl border-b-[1px] border-b-borderColor p-[22px] font-semibold">
        Sessions
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <SessionCard
          HuntingUnit="320"
          State="MT"
          Species="ELK"
          CreatedAt={"2025-01-17T12:34:56"}
        />
      </SidebarContent>
    </Sidebar>
  );
};

export default SessionSideBar;
