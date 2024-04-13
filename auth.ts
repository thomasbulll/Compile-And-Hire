import NextAuth from "next-auth"
import authConfig from '@/auth.config';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      console.log({sessionToken: token})
      return session
    },
    async jwt({token}) {
      return token
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
