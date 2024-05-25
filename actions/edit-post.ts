"use server";

import * as zod from "zod";
import { EditPostSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getPostById } from "@/data/posts";

export const editPost = async (
    values:  zod.infer<typeof EditPostSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized! "}
    };

    const postId = values.id;

    const existingPost = await getPostById(postId);

    if (!existingPost) {
        return { error: "No Pre-existing post! "}
    };

    // if (existingPost.userId != user.id) {
    //     return { error: "You are not the post's owner!"}
    // };

    await db.post.update({
        where: {id: postId },
        data: {
            ...values,
        }
    })

    return { success: "Settings Updated!" };
}
