import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import NextAuth from "next-auth";
import authConfig from '@/auth.config';
import { getAccountByUserId } from "@/data/account";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn ({user, account}) {
      //Allow Oauth without email verification (signin through goog, github).
      if (account?.provider !== "credentials") return true;
      
      //Block signin on accounts that arent verified.
      const existingUser = await getUserById(user.id ?? '');
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        // Delete confirmation
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        });
      }

      return true
    },
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.isOauth = token.isOAuth as boolean;
      }

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

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.name = existingUser.name;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token
    }
  },
  events: {
    // No need to verify email if the account is from an OAuth source
    async linkAccount({ user }) {
      await db.user.update({
        where:{id: user.id},
        data: {emailVerified: new Date()}
      });
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "auth/error"
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
