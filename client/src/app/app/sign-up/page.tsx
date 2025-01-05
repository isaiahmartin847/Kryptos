"use client";
import { Clerk } from "@clerk/clerk-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const clerkPublicKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPublicKey) {
  throw new Error(
    "NEXT_PUBLIC_CLERK_FRONTEND_API is not defined in your environment variables."
  );
}

const clerk = new Clerk(clerkPublicKey);

const SignUpPage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const clerkRedirection = async () => {
      try {
        setProgress(30);

        await clerk.load();
        setProgress(60);

        const user = clerk.user;
        setProgress(80);

        if (user) {
          console.log("User is logged in");
          setProgress(90);
          router.push("http://app.localhost:3000");
        } else {
          console.log("User is not logged in");
          setProgress(90);
          // clerk.redirectToSignUp();
        }

        setProgress(100);
      } catch (error) {
        console.error(`Error loading Clerk client: ${error}`);
        setProgress(100);
      }
    };

    clerkRedirection();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Progress
          value={progress}
          className="w-full"
        />
        <p className="text-lg text-textColor mt-2 text-center">
          {progress < 100 ? "Loading..." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
