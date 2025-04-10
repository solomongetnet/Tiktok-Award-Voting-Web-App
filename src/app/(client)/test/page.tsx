"use client";

import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const session = useSession();
  return <div></div>;
};

export default Page;
