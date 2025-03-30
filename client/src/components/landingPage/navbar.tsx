import Link from "next/link";
import MoreDropdownMenu from "./moreDropdownBtn";
import Image from "next/image";

const Navbar = () => {


  const homeUrl = process.env.NEXT_PUBLIC_HOST_URL;
  const prefix = process.env.NODE_ENV === "development" ? "http" : "https";

  const url = `${prefix}://app.${homeUrl}`


  return (
    <div className="flex h-[75px] w-full items-center justify-between bg-secondaryColor px-7">
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

      <div className="hidden justify-center sm:flex sm:flex-1">
        <h1 className="text-3xl font-semibold lg:text-5xl">Kryptos AI</h1>
      </div>

      <div className="flex w-[200px] items-center justify-end space-x-3">
        <MoreDropdownMenu />
        <Link
          className="cursor-pointer text-lg italic underline hover:text-primaryAccentColor"
          href={url}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
