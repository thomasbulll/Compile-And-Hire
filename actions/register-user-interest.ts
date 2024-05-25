"use server";

import { getInterestedStudentIds } from "@/data/posts";
import { db } from "@/lib/db";

export const registerProjectInterest = async(userRole: "ADMIN" | "USER" | "BUSINESS" | undefined, userId: string | undefined, postId: string | undefined, interestedStudentIds: string[] | undefined) => {
    if (!userId) {
        return { error: "Invalid user" };
    }

    if (!userRole || userRole != "USER") {
        return { error: "Invalid role" };
    }

    if (!postId) {
        return { error: "Invalid post" };
    }

    interestedStudentIds?.push(userId)

    await db.post.update({
        where: { id: postId },
        data: {interestedStudentIds: interestedStudentIds}
    });

    return { success: "Email verified!" };
}
