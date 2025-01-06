import Link from "next/link";
import MoreDropdownMenu from "./moreDropdownBtn";

const Navbar = () => {
  return (
    <div className="flex h-[75px] w-full bg-secondaryColor justify-between items-center px-7">
      <div className="flex-none"></div>

      <div className="flex-1 text-center">
        <h1 className="text-5xl font-semibold">Hunt Regs</h1>
      </div>

      <div className="flex items-center space-x-3">
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
