import LandingPageFooter from "@/components/landingPage/footer";
import Navbar from "@/components/landingPage/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center space-y-4 mt-40">
        <h1 className="text-5xl text-textColor font-bold">
          Welcome to Hunt Regs
        </h1>
        <p className="text-mutedColor text-xl text-center w-1/4">
          The cool morning air carried the scent of fresh rain as the sun peeked
          over the horizon. Birds chirped in the distance, signaling the start
          of a new day. The grass glistened with dew, and the sky slowly turned
        </p>
      </div>
      <div className="flex w-full justify-center mt-8 ">
        <Link href="http://app.localhost:3000/sign-up">
          <Button variant="secondary">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
