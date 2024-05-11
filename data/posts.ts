import { db } from "@/lib/db";

export const postsByBusinessId = async (businessId: string) => {
    try{
        const posts = await db.post.findMany({where: {businessId}});
        return posts;
    } catch {
        return null;
    }
}

export const postById = async (id: string) => {
    try{
        const posts = await db.post.findUnique({where: {id}});
        return posts;
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