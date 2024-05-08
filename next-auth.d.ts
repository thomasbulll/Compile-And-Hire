import NextAuth, {DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER" | "BUSINESS";
    isTwoFactorEnabled: boolean;
    isOauth: boolean;
    bio: string;
    urls: string[];
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
