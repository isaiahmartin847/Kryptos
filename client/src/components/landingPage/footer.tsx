import Image from "next/image";
import Link from "next/link";

const LandingPageFooter = () => {
  return (
    <footer className="w-full h-[200px] py-[39px] px-[18px] bg-secondaryColor border-t-[1px] border-mutedColor">
      <div className="border-2 flex space-x-28">
        <Image
          src={"/RegMapsLogo.png"}
          alt={"Logo"}
          height={122}
          width={128}
        />
        {/* company div */}
        <div>
          <h1 className="text-xl font-semibold">Company</h1>
          <div className="text-[12px]">
            <Link href={"/about-us"}>About us</Link>
          </div>
        </div>
        {/* Policies div */}
        <div>
          <h1 className="text-xl font-semibold">Policies</h1>
          <div className="text-[12px]"></div>
        </div>
        {/* quick links div */}
        <div>
          <h1 className="text-xl font-semibold">Quick links</h1>
          <div className="text-[12px]"></div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
