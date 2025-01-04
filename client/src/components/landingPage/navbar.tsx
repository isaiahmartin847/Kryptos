import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex h-[75px] w-full bg-secondaryColor justify-between items-center">
      {/* this is the image div */}
      <div></div>
      {/* this is for the brand name */}
      <div>
        <h1 className="text-5xl font-semibold">Hunt Ref Maps</h1>
      </div>
      {/* this is for the nav links */}
      <div>
        {/* more */}
        <Link href="http://app.localhost:3000/sign-in">Sign In</Link>
      </div>
    </div>
  );
};

export default Navbar;
