import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AiTwotoneSetting } from "react-icons/ai";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
}

export const UserInfo = ({
    user,
    label
}: UserInfoProps) => {
    const gitHubConst = "https://github.com/";
    
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between
                rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max--w-[180px]
                    font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between
                rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Username
                    </p>
                    <p className="truncate text-xs max--w-[180px]
                    font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between
                rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <p className="truncate text-xs max--w-[180px]
                    font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between
                rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
                <div className="pt-10">
                    <Link className="flex flex-row items-center
                    rounded-lg border p-3 shadow-sm bg-neutral-200"
                    href="/settings">
                        <AiTwotoneSetting/>
                        <p className="px-3 text-sm font-medium">
                            Edit profile
                        </p>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};