import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex h-[75px] w-full bg-secondaryColor items-center px-7">
      <div className="w-[200px]">
        <Link href="/">
          <Image
            src="/RegMapsLogo.png"
            alt="Logo"
            height={52}
            width={54}
          />
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <h1 className="text-5xl font-semibold">Dashboard</h1>
      </div>

      <div className="w-[200px] flex items-center space-x-3 justify-end">
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
