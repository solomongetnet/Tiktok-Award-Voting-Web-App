import {
  Calendar,
  Home,
  Inbox,
  List,
  Search,
  Settings,
  User,
  Users,
  Video,
} from "lucide-react";

export const navLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Categories",
    url: "/categories",
  },

  {
    title: "About",
    url: "/about",
  },
  {
    title: "Results",
    url: "/results",
  },
];

export const adminNavLinks = [
  {
    icon: Home,
    title: "Dashboard",
    url: "/admin/dashboard",
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: List,
  },
  {
    title: "Creators",
    url: "/admin/creators",
    icon: Video,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];
