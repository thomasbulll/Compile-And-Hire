"use server";

import { signOut } from "@/auth";

export const logout = async () => {
    console.log("Logout")
    await signOut();
}