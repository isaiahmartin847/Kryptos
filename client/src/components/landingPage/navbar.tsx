import Link from "next/link";
import MoreDropdownMenu from "./moreDropdownBtn";

const Navbar = () => {
  return (
    <div className="flex h-[75px] w-full bg-secondaryColor justify-between items-center px-7">
      {/* this is the image div */}
      <div></div>
      {/* this is for the brand name */}
      <div>
        <h1 className="text-5xl font-semibold">Hunt Reg Maps</h1>
      </div>
      {/* this is for the nav links */}
      <div>
        <MoreDropdownMenu />
        <Link
          className="text-lg underline italic hover:text-primaryAccentColor"
          href="http://app.localhost:3000/sign-in">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
