"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminNavLinks } from "@/constants/nav-links";
import { ChevronUp, User2 } from "lucide-react";
import { useSession } from "next-auth/react";

export function AdminSidebar() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <Sidebar className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-3 ">
            <SidebarMenu>
              {adminNavLinks.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`relative flex items-center px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${
                          isActive
                            ? "text-primary bg-primary/10 dark:bg-primary/20"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                            isActive
                              ? "text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        />
                        <span className="font-medium">{item.title}</span>
                        {isActive && (
                          <motion.span
                            className="absolute left-0 top-1/2 w-1 h-5 bg-primary rounded-r-full"
                            layoutId="activeIndicator"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: -10 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <User2 className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {session.data?.user?.email}
              </span>
              <ChevronUp className="ml-auto h-5 w-5 text-gray-500 dark:text-gray-400" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
