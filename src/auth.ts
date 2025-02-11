import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/server/config/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 190,
    updateAge: 24 * 60 * 60, // Update the session every 1 day
  },
  pages: {
    signIn: "/auth/login", // Customize the sign-in page URL
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (account?.provider === "google") {
          if (!existingUser) {
            // Create a new user if not already in the database
            await prisma.user.create({
              data: {
                email: user.email as string,
                name: user.name,
                role: "USER",
                provider: "GOOGLE",
              },
            });
          }

          return true;
        }

        return false;
      } catch (error) {
        return false;
      }
    },
    async session({ session, token }: any | unknown) {
      console.log(session);
      try {
        const userDoc = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: {
            id: true,
            email: true,
            createdAt: true,
            role: true,
            name: true,
          },
        });

        // if user role is changed, update token
        const wasUserRoleChanged = token.role !== userDoc?.role;

        if (wasUserRoleChanged) {
          token.role = userDoc?.role;
          session.user = userDoc;
          return session;
        }

        // If no user is found, sign out the user (ex. when admin delete the user)
        if (!userDoc) {
          await signOut({ redirect: false });
          return null;
        }

        session.user = userDoc;
        return session;
      } catch (_) {
        return null;
      }
    },
    async jwt({ token }: any) {
      if (!token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        token.role = dbUser?.role;
      }

      return token;
    },
  },

  secret: process.env.AUTH_SECRET, // ✅ Updated to AUTH_SECRET
});
