"use client";

import { ViewSinglePost } from "@/components/posts/view-single-post";
import { getMostRecentPosts, postById } from "@/data/posts";
import { useSearchParams } from "next/navigation";

const SinglePostPage = async () => {

    const searchParams = useSearchParams();

    const postId = searchParams.get("id")

    const post = await postById(postId || "");

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <ViewSinglePost
            post={post}/>
        </div>
    );
};

export default SinglePostPage;