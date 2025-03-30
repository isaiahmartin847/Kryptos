import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {

  const homeUrl = process.env.NEXT_PUBLIC_HOST_URL;
  const prefix = process.env.NODE_ENV === "development" ? "http" : "https";

  const url = `${prefix}://app.${homeUrl}`

  return (
    <div>
      <div className="mt-40 flex flex-col items-center space-y-4 text-center">
        <h1 className="text-3xl font-bold text-textColor md:text-5xl">
          Welcome to Kryptos AI
        </h1>
        <p className="w-3/4 text-center text-lg text-mutedColor md:w-2/4 md:text-xl lg:w-1/4">
          Our AI-driven platform leverages retrieval augmentations and advanced
          generative models to forecast stock prices. By utilizing the latest
          technology, we offer a fresh perspective on how AI, when done right,
          can be a valuable tool for making smarter decisions in the stock and
          crypto markets.
        </p>
      </div>
      <div className="mt-8 flex w-full justify-center">
        <Link href={url}>
          <Button variant="secondary">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
