import Image from "next/image";
import Link from "next/link";

const LandingPageFooter = () => {
  return (
    <footer className="flex w-full h-[200px] pt-[39px] pl-[18px] bg-secondaryColor border-t-[1px] border-mutedColor">
      <Image
        src={"/RegMapsLogo.png"}
        alt={"Logo"}
        height={122}
        width={128}
      />
      {/* company div */}
      <div>
        <h1>Company</h1>
        <div>
          <Link href={"/about-us"}>About us</Link>
        </div>
      </div>
      {/* polices div */}
      {/* quick links div */}
    </footer>
  );
};

export default LandingPageFooter;
