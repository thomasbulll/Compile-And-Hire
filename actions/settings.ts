"use server";

import * as zod from "zod";
import { SettingsSchema, UpdateSettingsSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const settings = async (
    values:  zod.infer<typeof SettingsSchema>
) => {

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
