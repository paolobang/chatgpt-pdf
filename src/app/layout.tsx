import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { Toaster } from 'react-hot-toast'
// import dynamic from 'next/dynamic'
//const Providers = dynamic(() => import("@/components/Providers"), { ssr: false, });


const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "PDF Context",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>{children}</body>
          <Toaster />
        </html>

      </Providers>
    </ClerkProvider>
  );
}
