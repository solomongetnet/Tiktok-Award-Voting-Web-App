import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar/sidebar";

import AdminHeader from "@/components/admin/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">
        <AdminHeader />
        <div className="min-h-[200vh] px-4 py-8 mx-auto relative ">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
