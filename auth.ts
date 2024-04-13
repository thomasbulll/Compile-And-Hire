import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

import NextAuth from "next-auth";
import authConfig from '@/auth.config';

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

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      console.log(token.role)
      console.log({sessionToken: token})
      return session
    },
    async jwt({token}) {
      // Not logged in
      if (!token.sub){
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser){
        return token;
      }

      token.role = existingUser.role;

      return token
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
