"use server";

import { auth } from "@/auth";

// Ensure the user is authenticated
const AuthGuard = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Please login first");
  }
};

export default AuthGuard;
