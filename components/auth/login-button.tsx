"use client";

import { useRouter } from "next/router";

interface LoginButtonProps{
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean,
}

export const LoginButton = ({
    children,
    mode="redirect",
    asChild
}: LoginButtonProps) => {
    const router = useRouter();

    const onClick = () => {
         router.push("/login");
    }
    return (
        <span onClick={onClick}>
            {children}
        </span>
    );
};
