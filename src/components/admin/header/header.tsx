"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 right-0 left-0 z-30 shadow bg-white/80 backdrop-blur-md">
      <div className=" px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />

          <h2 className="text-xl font-semibold text-gray-900">Admin</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative max-md:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="text-sm pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New award nomination</DropdownMenuItem>
              <DropdownMenuItem>Trending challenge alert</DropdownMenuItem>
              <DropdownMenuItem>Weekly report ready</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>Signout</Button>
        </div>
      </div>
    </header>
  );
}
