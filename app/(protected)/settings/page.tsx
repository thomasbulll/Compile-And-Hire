"use client";

import { useSession} from "next-auth/react";
import { logout } from "@/actions/logout";

const SettingsPage = () => {
    const session = useSession();

    const onClick = () => {
        logout();
    }

    return (
        <main className="main pt-36">
        <h1>
            {JSON.stringify(session)}
        </h1>
            <button type="submit" onClick={onClick}>
                Signout
            </button>
        </main>
    );
}

export default SettingsPage