import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

const SessionSideBar = () => {
  return (
    <Sidebar className="bg-secondaryColor text-textColor border-r-borderColor">
      <SidebarHeader className="items-center text-xl border-b-[1px] border-b-borderColor p-[22px] font-semibold">
        Sessions
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto"></SidebarContent>
    </Sidebar>
  );
};

export default SessionSideBar;
