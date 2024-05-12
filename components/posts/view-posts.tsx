"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BusinessPost } from "@/components/posts/business-post";
import { FormError } from "../form-error";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

interface UserPostsProps {
    businessId: string
    companyName: string;
    posts: PostProps[] | null;
}

export const UserPosts = ({
    businessId,
    companyName,
    posts
}: UserPostsProps) => {

    const [error, setError] = useState<string | undefined>("");

    if (!posts) {
        setError("Error finding posts")
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
                <BusinessPost 
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
            <div className="text-center">
                <Link className="" href="/post/new-post">
                    <Button>
                    New Post
                    </Button>
                </Link>
            </div>
        </CardContent>
    </Card>
    )    
}
