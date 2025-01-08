import Link from "next/link";
import MoreDropdownMenu from "./moreDropdownBtn";
import Image from "next/image";

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
        <h1 className="text-5xl font-semibold">Hunt Regs</h1>
      </div>

      <div className="w-[200px] flex items-center space-x-3 justify-end">
        <MoreDropdownMenu />
        <Link
          className="text-lg underline italic hover:text-primaryAccentColor cursor-pointer"
          href="http://app.localhost:3000/sign-in">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
