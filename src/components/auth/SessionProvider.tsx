"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useState, useEffect } from "react";

export default function SessionProvider({
  children,
  session = null,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  // Add client-side protection for React hooks
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render the session provider once the client component is mounted
  if (!mounted) {
    // Return a simple placeholder or the children without the provider
    return <>{children}</>;
  }
  
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
