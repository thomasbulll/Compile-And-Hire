import NextAuth, {DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER" | "BUSINESS"
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
