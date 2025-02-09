import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/images/logo.png";
import { navLinks } from "@/constants/nav-links";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

interface MobileMenuProps {
  pathname: string;
}

export function MobileMenu({ pathname }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const isUnAuthenticated = session.status === "unauthenticated";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const hadnleSignout = () => {
    signOut().then(() => {
      toast.message("Signout successfull");
    });
  };

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[400px] p-0">
        <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-pink-50">
          <SheetHeader>
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <SheetTitle>
                <Image
                  src={logoImage.src}
                  alt="TikTok Awards Logo"
                  width={80}
                  height={80}
                  className="w-[80px]"
                />
              </SheetTitle>
            </div>
          </SheetHeader>
          <nav className="flex flex-col space-y-1 p-6">
            <AnimatePresence>
              {navLinks.map(({ title, url }, index) => (
                <motion.div
                  key={title}
                  variants={mobileMenuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={index}
                >
                  <Link
                    href={`${url.toLowerCase()}`}
                    className={`block py-3 px-4 text-lg font-semibold transition-all duration-300 rounded-lg ${
                      pathname === url.toLowerCase()
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {title}
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </nav>

          <div className="mt-auto flex flex-col gap-2 p-4 border-t border-gray-200">
            <Link passHref href={"/categories"}>
              <Button className="w-full">Vote Now</Button>
            </Link>
            {isUnAuthenticated && (
              <Link passHref href={"/auth/login"}>
                <Button className="w-full" variant={"outline"}>
                  Login
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <Button
                className="w-full"
                variant={"outline"}
                onClick={hadnleSignout}
              >
                Signout
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
