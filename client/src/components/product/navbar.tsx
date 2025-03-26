"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { House } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from "@radix-ui/react-tooltip";

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import SavedStockSideSheet from "./sideSheet";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const homeUrl = process.env.NEXT_PUBLIC_HOST_URL;
  const prefix = process.env.NODE_ENV === "development" ? "http" : "https";

  const url = pathname.length > 1 ? "/" : `${prefix}://${homeUrl}/`;

  return (
    <div className="flex h-[75px] w-full items-center bg-secondaryColor px-7">
      <div className="w-[200px]">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Logo"
            height={52}
            width={54}
            priority={true}
          />
        </Link>
      </div>

      <div className="flex flex-1 justify-center"></div>

      <div className="flex w-[200px] items-center justify-end space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={url}>
                <House />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="-translate-x-[14px] transform rounded-lg"
            >
              <p>Go to homepage</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SavedStockSideSheet />

        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-[40px] h-[40px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
