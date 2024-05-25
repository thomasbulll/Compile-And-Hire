"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { registerProjectInterest } from "@/actions/register-user-interest";

interface PostProps {
    id: string;
    title: string;
    compensation: string | null;
    description: string;
    company: string;
    creationTime: Date;
    expirationDate: Date | null;
    businessId: string;
    interestedStudentIds: string[];
}

interface ViewSinglePostProps {
    post: PostProps | null;
    userId: string | undefined;
    userRole: "ADMIN" | "USER" | "BUSINESS" | undefined;
}

export const ViewSinglePost = ({
    post,
    userId,
    userRole
}: ViewSinglePostProps) => {

    const [isPending, startTransition] = useTransition();


    const currentTime = new Date();

    let postExpired = false
    if (post?.expirationDate && post.expirationDate < currentTime) {
        postExpired = true;
    }
    
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    if (!post) {
        setError("Error fetching post")
    };


    const registerUserInterest = () => {
        startTransition(() => {
            registerProjectInterest(userRole, userId, post?.id, post?.interestedStudentIds).then((data) => {
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.success) {
                    setSuccess(data?.success);
                }
            }).catch(() => setError("Something went wrong."))
        });
    }
    
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
                        {postExpired ? (
                            <p className="truncate text-xs max--w-[180px]
                            font-mono p-1 bg-red-300 rounded-md">
                                {post?.expirationDate.toLocaleDateString()}
                            </p>
                        ) : (
                            <p className="truncate text-xs max--w-[180px]
                            font-mono p-1 bg-slate-100 rounded-md">
                                {post?.expirationDate.toLocaleDateString()}
                            </p>
                        )}
                    </div>
                )}
                {userRole == "USER" && (
                    <Button
                        className="w-full"  
                        disabled = {isPending}
                        onClick={() => {
                            registerUserInterest()
                        }
                    }>
                        Register your interest
                    </Button>
                )}
                <FormError message={error} />
                <FormSuccess message={success} />
            </CardContent>
    </Card>
    );
}
