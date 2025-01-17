import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

const SessionSideBar = () => {
  return (
    <Sidebar className="bg-secondaryColor text-textColor border-r-borderColor">
      <SidebarHeader className="items-center text-xl border-b-2 border-b-borderColor p-4 font-semibold">
        Sessions
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto "></SidebarContent>
    </Sidebar>
  );
};

export default SessionSideBar;
