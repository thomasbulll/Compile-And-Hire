"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Post } from "@/components/posts/post";
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

interface UserPostsProps {
    userId: string
    companyName: string;
    posts: PostProps[] | null;
}

export const UserPosts = ({
    userId,
    companyName,
    posts
}: UserPostsProps) => {

    const [error, setError] = useState<string | undefined>("");

    if (!posts) {
        setError("No posts found")
    }else{
        for (let i=0; i < posts?.length; i++) {
            if (posts[i].userId != userId){
                setError("Error: ID Mismatch");
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
                            id={post.id}
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
        }
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
                id={post.id} 
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
    )    
}
