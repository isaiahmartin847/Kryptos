import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LandingPageFooter = () => {
  return (
    <footer className="min-h-[200px] w-full bg-secondaryColor px-[18px] py-[39px]">
      <div className="flex flex-col items-center space-x-0 space-y-5 md:flex-row md:items-stretch md:space-x-28 md:space-y-0">
        <Image
          src={"/Logo.png"}
          alt={"Logo"}
          height={122}
          width={128}
          priority={true}
        />
        {/* company div */}
        {/* <div> */}
        {/* <h1 className="text-xl font-semibold">Company</h1> */}
        {/* <div className="flex flex-col text-[12px]"> */}
        {/* <Link className="hover:underline" href={"/about-us"}> */}
        {/* About us */}
        {/* </Link> */}
        {/* </div> */}
        {/* </div> */}
        {/* Policies div */}
        <div>
          <h1 className="text-xl font-semibold">Policies</h1>
          <div className="flex flex-col text-[12px]">
            <Link className="hover:underline" href={"/terms-and-conditions"}>
              Terms of service
            </Link>
          </div>
        </div>
        {/* quick links div */}
        <div>
          <h1 className="text-xl font-semibold">Quick links</h1>
          <div className="flex flex-col text-[12px]">
            <Link className="hover:underline" href={"/pricing"}>
              Pricing
            </Link>
            {/* <Link className="hover:underline" href={"/about-page"}>
              About
            </Link> */}
            <Link className="hover:underline" href={"/"}>
              Home
            </Link>
          </div>
        </div>
      </div>
      {/* this is the copyright div */}
      <div className="mt-3 flex justify-center md:mt-0 md:justify-end">
        <Copyright height={10} width={10} color="white" />
        <span className="text-[10px]">
          2025 Kryptos AI. ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
