"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface IProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}
const ClearSearchButton = ({ variant }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClearSearchQuery = () => {
    router.push(pathname);
  };
  
  return (
    <Button
      variant={variant || "link"}
      size={"sm"}
      onClick={handleClearSearchQuery}
    >
      Clear Search
    </Button>
  );
};

export default ClearSearchButton;
