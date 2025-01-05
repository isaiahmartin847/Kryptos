import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BookText, Globe, Wallet } from "lucide-react";

const MoreDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-lg">More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BookText />
            <span>About Page</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Wallet />
            <span>Pricing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Globe />
            <span>Coverage</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreDropdownMenu;
