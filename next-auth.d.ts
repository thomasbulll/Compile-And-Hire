import NextAuth, {DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER" | "BUSINESS";
    isTwoFactorEnabled: boolean;
    isOauth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
