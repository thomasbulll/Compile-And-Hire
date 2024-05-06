import { db } from "@/lib/db";

export const postsByuserId = async (userId: string) => {
    try{
        const posts = await db.post.findMany({where: {userId}});
        return posts;
    } catch {
        return null;
    }
}
