import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BookText, Globe, House, Wallet } from "lucide-react";
import Link from "next/link";

const MoreDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-lg font-thin">More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <Link href={"/"}>
            <DropdownMenuItem>
              <House />
              <span>Home Page</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/pricing"}>
            <DropdownMenuItem>
              <Wallet />
              <span>Pricing</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreDropdownMenu;
