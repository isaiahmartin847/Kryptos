"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { House } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from "@radix-ui/react-tooltip"; // Make sure you're using Radix UI Tooltip
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const Navbar = () => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setUrl("http://localhost:3000/");
    } else if (process.env.NODE_ENV === "production") {
      // TODO set this with the prod url
      setUrl("http://PROD");
    }
  }, []);

  return (
    <div className="flex h-[75px] w-full items-center bg-secondaryColor px-7">
      <div className="w-[200px]">
        <Link href="/">
          <Image src="/Logo.png" alt="Logo" height={52} width={54} />
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
