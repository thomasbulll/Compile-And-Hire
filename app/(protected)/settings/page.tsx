"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user-button";
import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useTransition } from "react";

const SettingsPage = () => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            settings({
                name: "test name 2"
            })
        });
    }

    return (
        <Card className=" pt-36 w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Settings
                </p>
            </CardHeader>
            <CardContent>
                <Button disabled={isPending} onClick={onClick}>
                    Update Name
                </Button>
            </CardContent>
        </Card>
    );
}

export default SettingsPage