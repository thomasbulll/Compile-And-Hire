"use client";

import { postsByuserId } from "@/data/posts";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { Post } from "@/components/posts/post";

interface PostProps {
    id: string;
    title: string;
    compensation: number | null;
    description: string;
    company: string;
    creationTime: Date;
    expirationDate: Date | null;
    userId: string;
}

interface UserPostsProps {
    companyName: string;
    posts: PostProps[] | null;
}

export const UserPosts = ({
    companyName,
    posts
}: UserPostsProps) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    if (posts?.length == 0) {
        setError("No posts found")
    }

    return (
        <Card className="w-[600px] shadow-md">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                {companyName} Posts
            </p>
        </CardHeader>
        <CardContent className="space-y-4">
            {posts?.map((post) => (
                <Post 
                title={post.title}
                description={post.description}
                company={post.company}
                compensation={post.compensation}
                creationTime={post.creationTime}
                expirationDate={post.expirationDate}
                userId={post.userId} />
            ))}
        </CardContent>
    </Card>
    )    
}
