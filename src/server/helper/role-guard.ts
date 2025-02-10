"use server";
import { auth } from "@/auth";

//  i created this function for checking role based
const RoleGuard = async (accessedBy: ("USER" | "ADMIN")[]) => {
  const session: any = await auth();

  console.log(
    "---------------------------------session-------------------------",
    session
  );
  if (!session) {
    throw new Error("Please login first");
  }

  if (!accessedBy.includes(session?.user?.role)) {
    throw new Error("You can't access");
  }
};

export default RoleGuard;
