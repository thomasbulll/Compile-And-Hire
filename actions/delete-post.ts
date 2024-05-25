"use server";

import * as zod from "zod";
import { db } from "@/lib/db";
import { getPostById, postsByBusinessId } from "@/data/posts";
import { getBusinessByBusinessId } from "@/data/business";
import { DeletePostSchema } from "@/schemas";

export const deletePost = async (values: zod.infer<typeof DeletePostSchema>) => {

    const validatedFields = DeletePostSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const { postId, businessId} = validatedFields.data;

    const business = await getBusinessByBusinessId(businessId);

    if (!business) {
      return {
        error: "Business account not found"
      }
    }

    const post = await getPostById(postId);

    if (post?.businessId != businessId) {
        return {
            error: "You don't own this post"
        }
    }

    try {
        await db.post.delete({
            where: {
                id: postId
            }
        })
        return {
            success: "Post Deleted"
        };
      } catch (error) {
        return { error: "Error creating post" };
      }
}
