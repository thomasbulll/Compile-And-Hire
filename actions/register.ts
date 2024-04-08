"use server";

import bcrypt from "bcrypt";
import * as zod from "zod";
import { RegisterSchema } from "@/schemas";

import { db } from "@/lib/db";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // const existingUserEmail = await db.user.findUnique({
    //     where:{
    //         email,
    //     }
    // });

    // const existingUsername = await db.user.findUnique({
    //     where:{
    //         name,
    //     }
    // });

    // if (existingUserEmail){
    //     return {
    //         error: "Email already in use!"
    //     };
    // }

    // if (existingUsername){
    //     return {
    //         error: "Username already in use!"
    //     };
    // }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    //TODO: Send verification email

    return {
        success: "Account Created"
    }
}