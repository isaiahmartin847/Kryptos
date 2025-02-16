import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LandingPageFooter = () => {
  return (
    <footer className="w-full min-h-[200px] py-[39px] px-[18px] bg-secondaryColor">
      <div className="flex flex-col items-center space-x-0 space-y-5 md:flex-row md:items-stretch md:space-x-28 md:space-y-0">
        <Image
          src={"/RegMapsLogo.png"}
          alt={"Logo"}
          height={122}
          width={128}
        />
        {/* company div */}
        <div>
          <h1 className="text-xl font-semibold">Company</h1>
          <div className="text-[12px] flex flex-col">
            <Link
              className="hover:underline"
              href={"/about-us"}>
              About us
            </Link>
          </div>
        </div>
        {/* Policies div */}
        <div>
          <h1 className="text-xl font-semibold">Policies</h1>
          <div className="text-[12px] flex flex-col">
            <Link
              className="hover:underline"
              href={"/terms-of-service"}>
              Terms of service
            </Link>
          </div>
        </div>
        {/* quick links div */}
        <div>
          <h1 className="text-xl font-semibold">Quick links</h1>
          <div className="text-[12px] flex flex-col">
            <Link
              className="hover:underline"
              href={"/pricing"}>
              Pricing
            </Link>
            <Link
              className="hover:underline"
              href={"/about-page"}>
              About
            </Link>
            <Link
              className="hover:underline"
              href={"/"}>
              Home
            </Link>
          </div>
        </div>
      </div>
      {/* this is the copyright div */}
      <div className="flex justify-center mt-3 md:justify-end md:mt-0">
        <Copyright
          height={10}
          width={10}
          color="white"
        />
        <span className="text-[10px]">
          2025 Kryptos AI. ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
