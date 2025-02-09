import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/assets/styles/index.css";
import "@/assets/styles/styles.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/providers/redux.provider";
import GlobalModals from "@/global-modals";
import TanstackProvider from "@/providers/tanstack.provider";
import NextAuthProvider from "@/providers/next-auth-provider";
import { AosProvider } from "@/providers/aos-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative tiktok award",
  description: "For ethiopian tiktok creators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${geistMono.variable} antialiased`}>
        <Toaster />

        <NextAuthProvider>
          <TanstackProvider>
            <ReduxProvider>
              <AosProvider>{children}</AosProvider>
              <GlobalModals />
            </ReduxProvider>
          </TanstackProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
