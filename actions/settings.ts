"use server";

import * as zod from "zod";
import { SettingsSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const StudentSettings = async (
    values:  zod.infer<typeof SettingsSchema>
) => {

    const validatedFields = SettingsSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    console.log(validatedFields)

    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized! "}
    };

    const dbUser = await getUserById(user.id || "");

    if (!dbUser) {
        return { error: "Unauthorized! "}
    };

    await db.user.update({
        where: {id: dbUser.id },
        data: {
            ...validatedFields.data,
        }
    })

    return { success: "Settings Updated!" };
}
