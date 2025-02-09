"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/images/logo.png";
import { DesktopNav } from "./_desktop-nav";
import { MobileMenu } from "./_mobile-menu";
import SignoutButton from "./__signout-button";

export default function ClientHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !isScrolled && isHomePage
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50"
      }`}
      style={{
        backgroundColor: isHomePage
          ? backgroundColor
          : "rgba(255, 255, 255, 0.9)",
      }}
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto ">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logoImage.src}
              alt="TikTok Awards Logo"
              width={100}
              height={100}
              className="w-[100px] transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* desctop nav */}
          <DesktopNav pathname={pathname} />

          <div className="flex items-center space-x-4">
            <div className=" hidden md:inline-flex space-x-4">
              <Link passHref href={"/categories"}>
                <Button
                  variant={isScrolled || !isHomePage ? "default" : "outline"}
                  className="transition-all duration-300 hover:scale-105 "
                >
                  Vote now
                </Button>
              </Link>

              <SignoutButton />
            </div>

            {/* mobile menu */}
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
