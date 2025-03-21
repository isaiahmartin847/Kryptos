import { BookmarkCheck, PanelRightClose } from "lucide-react";
import {
  Drawer,
  DrawerClose,
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
      <DrawerContent className="left-auto right-0 h-full w-4/5 max-w-[850px]">
        <DrawerHeader className="border-b-2 border-neutral-400">
          <div className="flex w-full items-center justify-between">
            <DrawerTitle>Saved Stocks</DrawerTitle>
            <DrawerClose asChild>
              <PanelRightClose className="hover:cursor-pointer" />
            </DrawerClose>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default SavedStockSideSheet;
