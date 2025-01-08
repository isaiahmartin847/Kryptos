import Image from "next/image";

const LandingPageFooter = () => {
  return (
    <footer className="w-full h-[200px] bg-secondaryColor border-t-[1pxs] border-mutedColor">
      <Image
        src={"/RegMapsLogo.png"}
        alt={"Logo"}
        height={122}
        width={128}
      />
    </footer>
  );
};

export default LandingPageFooter;
