import { BookmarkCheck, PanelRightClose } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useSavedStocks } from "@/providers/savedStocksProvider";

const SavedStockSideSheet = () => {
  const { isSavedStockError } = useSavedStocks();

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
        <div>
          {isSavedStockError ? (
            // handle error
            <div className="p-4 text-center text-lg">
              Oops! Something went wrong while fetching your saved stocks.
            </div>
          ) : true ? (
            // handle loading
            <div>loading</div>
          ) : (
            <div>done</div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SavedStockSideSheet;
