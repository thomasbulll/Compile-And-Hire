"use client";

import { EditPostForm } from "@/components/posts/edit-post-form";
import { postById } from "@/data/posts";
import { currentUser } from "@/lib/auth";
import { useSearchParams } from "next/navigation";

const EditPostPage = async () => {

    const searchParams = useSearchParams();

    const postId = searchParams.get("id")

    const user = await currentUser();

    const post = await postById(postId || "")

    // if (!post) {
    //     return (
    //         <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
    //             Invalid ID
    //         </div>
    //     )
    // }

    // if (user?.id != post?.userId) {
    //     <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
    //         Invalid User ID
    //     </div>
    // }

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <EditPostForm
            post={post}/>
        </div>
    );
};

export default EditPostPage;