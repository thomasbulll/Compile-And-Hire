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
        return null;
    }
    try{
        const post = await db.post.findUnique({where: {
            id: postId
            }
        });
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

export const getInterestedStudentIds = async (postId: string | null) => {
    if (!postId) {
        return null;
    }
    try{
        const post = await db.post.findUnique({
            where: { id: postId },
            select: { interestedStudentIds: true },
          });
        return post?.interestedStudentIds;
    } catch {
        return null;
    }
}

export const getAllPostTags = async () => {
    try{
        const tags = await db.tag.findMany();
        return tags
    } catch {
        return null;
    }
}
