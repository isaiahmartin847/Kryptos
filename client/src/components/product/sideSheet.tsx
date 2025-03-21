import { BookmarkCheck } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const SavedStockSideSheet = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <BookmarkCheck size={35} className="p-1 hover:cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="left-auto right-0 h-full w-full max-w-[700px]">
        <DrawerHeader>
          <DrawerTitle>Saved Stocks</DrawerTitle>
        </DrawerHeader>
        <div>Test</div>
      </DrawerContent>
    </Drawer>
  );
};

export default SavedStockSideSheet;
