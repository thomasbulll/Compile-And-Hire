"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormError } from "../form-error";

interface PostProps {
    id: string;
    title: string;
    compensation: string | null;
    description: string;
    company: string;
    creationTime: Date;
    expirationDate: Date | null;
    businessId: string;
}

interface ViewSinglePostProps {
    post: PostProps | null;
}

export const ViewSinglePost = ({
    post
}: ViewSinglePostProps) => {

    const [error, setError] = useState<string | undefined>("");

    if (!post) {
        setError("Error fetching post")
    };
    
    return (
        <Card className="w-[600px] shadow-md">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                {post?.title}
            </p>
        </CardHeader>
        <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between
                rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Description
                    </p>
                    <p className="truncate text-xs max--w-[180px]
                    font-mono p-1 bg-slate-100 rounded-md">
                        {post?.description}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between
                rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Company
                    </p>
                    <p className="truncate text-xs max--w-[180px]
                    font-mono p-1 bg-slate-100 rounded-md">
                        {post?.company}
                    </p>
                </div>
                {post?.compensation && (
                    <div className="flex flex-row items-center justify-between
                    rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Compensation
                        </p>
                        <p className="truncate text-xs max--w-[180px]
                        font-mono p-1 bg-slate-100 rounded-md">
                           $ {post?.compensation}
                        </p>
                    </div>
                )}
                <div className="flex flex-row items-center justify-between
                    rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Creation Date
                        </p>
                        <p className="truncate text-xs max--w-[180px]
                        font-mono p-1 bg-slate-100 rounded-md">
                            {post?.creationTime.toLocaleDateString()}
                        </p>
                    </div>
                {post?.expirationDate && (
                    <div className="flex flex-row items-center justify-between
                    rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Expiration Date
                        </p>
                        <p className="truncate text-xs max--w-[180px]
                        font-mono p-1 bg-slate-100 rounded-md">
                            {post?.expirationDate.toLocaleDateString()}
                        </p>
                    </div>
                )}
                <FormError message={error} />
            </CardContent>
    </Card>
    );
}
