import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SessionCard, SessionSkeletonCard } from "./cards/sessionCard";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAllSession } from "@/apiFunctions/getFunctions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const SessionSideBar = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUser();
  const pathname = usePathname();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => {
      if (user.user?.id) {
        return fetchAllSession(user.user.id);
      }

      return Promise.resolve([]);
    },

    enabled: !!user.user?.id,
    staleTime: 0,
  });

  if (pathname.slice(1, 2) === "p") {
    return null;
  }

  return (
    <Sidebar className="bg-secondaryColor text-textColor border-r-borderColor">
      <SidebarHeader className="items-center text-xl border-b-[1px] border-b-borderColor p-[22px] font-semibold">
        Sessions
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto scrollbar-thin scrollbar-thumb-borderColor scrollbar-track-secondaryColor custom-scrollbar">
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => {
              return <SessionSkeletonCard key={index} />;
            })
        ) : isError ? (
          <div className="flex justify-center text-center mt-2">
            <div className="w-2/3 text-red-500 text-lg">
              Unable to load the sessions.
            </div>
          </div>
        ) : (
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
