import { db } from "@/lib/db";

export const postsByBusinessId = async (businessId: string | undefined) => {
    if (!businessId) {
        return null;
    }
    try{
        const posts = await db.post.findMany({where: {businessId}});
        return posts;
    } catch {
        return null;
    }
}

export const getPostById = async (postId: string | null) => {
    if (!postId) {
        console.log("Invalid ID")
        return null;
    }
    try{
        const post = await db.post.findUnique({where: {
            id: postId
            }
        });
        console.log(post?.title)
        return post;
    } catch {
        return null;
    }
}

export const getMostRecentPosts = async () => {
    try{
        const posts = await db.post.findMany({ take: 10 })
        return posts;
    } catch {
        return null;
    }
}