import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SessionCard, SessionSkeletonCard } from "./cards/sessionCard";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllSession } from "@/apiFunctions/getFunctions";

const SessionSideBar = () => {
  const pathname = usePathname();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => fetchAllSession("user_2rxSCsvzYSw6kBl64hsXk37pkXV"),
    staleTime: 0,
  });

  console.log(data); // Log to check the contents

  if (pathname.slice(1, 2) === "p") {
    return null;
  }

  // return isLoading ? (
  //   <Sidebar className="bg-secondaryColor text-textColor border-r-borderColor">
  //     <SidebarHeader className="items-center text-xl border-b-[1px] border-b-borderColor p-[22px] font-semibold">
  //       Sessions
  //     </SidebarHeader>
  //     <SidebarContent className="overflow-y-auto">
  //       {Array(5).map((_, index) => {
  //         return <SessionSkeletonCard />;
  //       })}
  //     </SidebarContent>
  //   </Sidebar>
  // ) : isError ? (
  //   <div>Error fetching sessions</div>
  // ) : (
  //   <div>
  //     {data?.map((session) => (
  //       <div key={session.id}>
  //         <p>Species: {session.speciesName}</p>
  //         <p>State: {session.stateFullName}</p>
  //         <p>Expires at: {new Date(session.expiresAt).toLocaleString()}</p>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <Sidebar className="bg-secondaryColor text-textColor border-r-borderColor">
      <SidebarHeader className="items-center text-xl border-b-[1px] border-b-borderColor p-[22px] font-semibold">
        Sessions
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => {
              return <SessionSkeletonCard key={index} />;
            })
        ) : isError ? (
          // Render error content
          <div>Error occurred</div>
        ) : (
          // Render default content when no loading or error
          data?.map((session) => {
            return (
              <SessionCard
                ID={session.id}
                CreatedAt={session.createdAt}
                HuntingUnit={session.huntingUnitName}
                Species={session.speciesName}
                State={session.stateFullName}
                key={session.id}
              />
            );
          })
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default SessionSideBar;
