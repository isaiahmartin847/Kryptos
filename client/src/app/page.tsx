import Navbar from "@/components/landingPage/navbar";
import { Button } from "@/components/ui/button";

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
      <Button variant="secondary">Get started</Button>
    </div>
  );
}
