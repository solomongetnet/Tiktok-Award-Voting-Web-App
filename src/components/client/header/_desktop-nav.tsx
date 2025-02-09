import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks } from "@/constants/nav-links";

interface DesktopNavProps {
  pathname: string;
}

export function DesktopNav({ pathname }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex space-x-8">
      {navLinks.map(({ title, url }) => (
        <Link
          key={title}
          href={`${url.toLowerCase()}`}
          className={`text-sm font-semibold transition-all duration-300 relative group ${
            pathname === url.toLowerCase()
              ? "text-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          {title}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 " />
          {pathname === url.toLowerCase() && (
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"
              layoutId="underline"
              initial={false}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
