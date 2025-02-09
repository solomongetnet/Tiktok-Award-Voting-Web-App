"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const SignoutButton = () => {
  const { data: session, status } = useSession();

  const handleSignout = () => {
    signOut(); // Redirects to the sign-out page by default
  };

  if (status === "loading") {
    return <Button disabled>Loading...</Button>; // Show a loading state
  }

  if (session?.user) {
    return (
      <Button variant="outline" onClick={handleSignout}>
        Sign out
      </Button>
    );
  }

  return null;
};

export default SignoutButton;
