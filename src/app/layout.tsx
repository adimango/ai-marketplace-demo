import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/auth";
import SessionProvider from "@/components/auth/SessionProvider";
import ClientProviders from "./ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReStyle | Buy & Sell Fashion Items",
  description: "A marketplace for buying and selling preloved fashion items",
};

// Mark this component as using dynamic features with the dynamic export
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Attempt to get session but provide a fallback if it fails
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Failed to get session:", error);
    // Continue with null session
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ClientProviders>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ClientProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
