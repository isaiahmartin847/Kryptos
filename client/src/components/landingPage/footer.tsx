import Image from "next/image";

const LandingPageFooter = () => {
  return (
    <footer className="w-full h-[200px] bg-secondaryColor">
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
