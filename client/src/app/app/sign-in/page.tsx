"use client";
import { useEffect, useState } from "react";
import { Clerk } from "@clerk/clerk-js";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const frontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!frontendApi) {
  throw new Error(
    "NEXT_PUBLIC_CLERK_FRONTEND_API is not defined in your environment variables."
  );
}

const clerk = new Clerk(frontendApi);

export default function signInPage() {
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setProgress(30);

        await clerk.load();
        setProgress(60);

        const user = await clerk.user;
        if (user) {
          setProgress(99);
          router.push("http://app.localhost:3000");
        } else {
          setProgress(100);
          clerk.redirectToSignIn();
        }
      } catch (error) {
        setProgress(100);
        console.error("Error loading Clerk:", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Progress
          value={progress}
          className="w-full"
        />
        <p className="text-lg text-textColor mt-2 text-center">
          {progress < 100
            ? "Loading..."
            : progress == 99
            ? "Signed In"
            : "Redirecting"}
        </p>
      </div>
    </div>
  );
}
