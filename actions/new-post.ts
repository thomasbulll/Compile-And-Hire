"use server";

import * as zod from "zod";
import { NewPostSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { postsByBusinessId } from "@/data/posts";
import { getBusinessByUserId } from "@/data/business";


export const newPost = async (values: zod.infer<typeof NewPostSchema>) => {
    const validatedFields = NewPostSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const { title, compensation, description, company, expirationDate, userId} = validatedFields.data;

    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return { error: "User does not exist" };
    }

    if (existingUser.role == "USER") {
      return { error: "Only Business accounts can create posts!" };
    }

    const business = await getBusinessByUserId(userId);

    if (!business) {
      return {
        error: "Business account not found"
      }
    }

    const posts = await postsByBusinessId(business?.id)
    
    if (posts?.length && posts?.length >= 4) {
      return { error: "Maximum number of posts reached" }
    }

    const currentTime = new Date();

    if (expirationDate && currentTime > expirationDate) {
        return { error: "Expiration Date Invalid" }
    }

    try {
        await db.post.create({
          data: {
            title,
            compensation,
            description,
            company,
            creationTime: currentTime,
            expirationDate,
            businessId: business.id
          }
        });
        return {
            success: "Post Created"
        };
      } catch (error) {
        return { error: "Error creating post" };
      }
}
