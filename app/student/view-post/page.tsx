"use client";

import { ViewSinglePost } from "@/components/posts/view-single-post";
import { getPostById } from "@/data/posts";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PulseLoader } from "react-spinners";
import { currentUser } from "@/lib/auth";

const SinglePostPage = async () => {

    const searchParams = useSearchParams();
  
    const postId = searchParams.get("id");

    const user = await currentUser();
  
    const post = await getPostById(postId);

    return (
        <div className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
            {post ? (
                <ViewSinglePost 
                post={post}
                userId = {user?.id}
                userRole = {user?.role}
                />
            ) : (
            <Card className="w-[600px] shadow-md">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        Fetching Post
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center w-full justify-center">
                        <PulseLoader/>
                    </div>
                    <p className="text-1x1 font-semibold text-center">
                        If it has been more than a few seconds, please refresh.
                    </p>
                </CardContent>
            </Card>
            )}
        </div>
    ) 
};

export default SinglePostPage;