"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GenericPost } from "@/components/posts/generic-post";
import { FormError } from "../form-error";

interface PostProps {
    id: string;
    title: string;
    compensation: string | null;
    description: string;
    company: string;
    creationTime: Date;
    expirationDate: Date | null;
    userId: string;
}

interface ViewAllPostsProps {
    posts: PostProps[] | null;
}

export const ViewAllPosts = ({
    posts
}: ViewAllPostsProps) => {

    const [error, setError] = useState<string | undefined>("");

    if (!posts) {
        setError("No posts found")
    }
    
    return (
        <Card className="w-[600px] shadow-md">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                Posts
            </p>
        </CardHeader>
        <CardContent className="space-y-4">
            {posts?.map((post) => (
                <GenericPost
                id={post.id}
                key={post.id}
                title={post.title}
                description={post.description}
                company={post.company}
                compensation={post.compensation}
                creationTime={post.creationTime}
                expirationDate={post.expirationDate}/>
            ))}
            <FormError message={error} />
        </CardContent>
    </Card>
    );
}
