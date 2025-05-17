import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// This is a simple implementation for demo purposes
// In a production app, you'd want to use proper authentication
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a mock authenticate function
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            name: "Demo User",
            email: "user@example.com",
          };
        }
        return null;
      },
    }),
  ],
  // Use a simple hardcoded secret (typically you'd use an environment variable)
  secret: "demo_secret_that_is_at_least_32_characters_long",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  // Debug mode disabled to prevent console warnings
  debug: process.env.NODE_ENV === "development" ? false : false,
};
