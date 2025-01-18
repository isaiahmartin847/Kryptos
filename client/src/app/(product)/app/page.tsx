"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const Main = () => {
  const { user, isLoaded } = useUser(); // isLoaded helps avoid checking before the user is fetched

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        console.log(user.id); // Log user ID if logged in
      } else {
        console.log("not logged in");
      }
    }
  }, [isLoaded, user]); // Only run effect when user state is loaded

  return <div></div>;
};

export default Main;
