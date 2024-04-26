"use client";

import { useSession} from "next-auth/react";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user-button";

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        logout();
    }

    return (
        <main className="pt-36 items-center justify-between">
            <UserButton />
            <h1>
                {JSON.stringify(user)}
            </h1>
            <div className="bg-slate-300 p-10 rounded-xl">
                <button type="submit" onClick={onClick}>
                    Signout
                </button>
            </div>
        </main>
    );
}

export default SettingsPage