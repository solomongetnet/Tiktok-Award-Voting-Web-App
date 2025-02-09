import ClientHeader from "@/components/client/header/header";
import ClientFooter from "@/components/client/footer/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientHeader />
      {children}
      <ClientFooter />
    </>
  );
}
