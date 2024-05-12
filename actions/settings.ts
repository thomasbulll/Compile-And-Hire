"use server";

import * as zod from "zod";
import { StudentSettingsSchema, UpdateSettingsSchema, BusinessSettingsSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const StudentSettings = async (
    values:  zod.infer<typeof StudentSettingsSchema>
) => {

    const validatedFields = StudentSettingsSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized! "}
    };

    const dbUser = await getUserById(user.id || "");

    if (!dbUser) {
        return { error: "Unauthorized! "}
    };

    const values2: zod.infer<typeof UpdateSettingsSchema> = {};

    if (values.urls){
        const urlArray = Array.from(values.urls.values());
        const stringArray = urlArray.map((obj) => obj.value);
        values2.urls = stringArray;
        await db.user.update({
            where: {id: dbUser.id },
            data: {
                urls: stringArray
            }
        })
    }

    values2.bio = values.bio;
    values2.isTwoFactorEnabled = values.isTwoFactorEnabled;
    values2.name = values.name;

    await db.user.update({
        where: {id: dbUser.id },
        data: {
            ...values2,
        }
    })

    return { success: "Settings Updated!" };
}


export const BusinessSettings = async (
    values:  zod.infer<typeof BusinessSettingsSchema>
) => {

    const validatedFields = BusinessSettingsSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized! "}
    };

    const dbUser = await getUserById(user.id || "");

    if (!dbUser) {
        return { error: "Unauthorized! "}
    };

    if (dbUser.role == "USER") {
        return { error: "Unauthorized! "}
    }

    await db.user.update({
        where: {id: dbUser.id },
        data: {
            ...values,
        }
    }).then(() => {
        console.log("UPDATED");
    }
    )

    return { success: "Settings Updated!" };

}