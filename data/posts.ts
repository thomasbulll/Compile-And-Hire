import { db } from "@/lib/db";

export const postsByuserId = async (userId: string) => {
    try{
        const posts = await db.post.findMany({where: {userId}});
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
