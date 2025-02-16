import Link from "next/link";
import MoreDropdownMenu from "./moreDropdownBtn";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex h-[75px] w-full bg-secondaryColor items-center justify-between px-7">
      <div className="w-[200px]">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Logo"
            height={52}
            width={54}
          />
        </Link>
      </div>

      <div className="hidden sm:flex-1 sm:flex justify-center">
        <h1 className="lg:text-5xl text-3xl font-semibold ">Kryptos AI</h1>
      </div>

      <div className="w-[200px] flex items-center space-x-3 justify-end">
        <MoreDropdownMenu />
        <Link
          className="text-lg underline italic hover:text-primaryAccentColor cursor-pointer"
          href="http://app.localhost:3000">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
