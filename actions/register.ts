"use server";

import bcrypt from "bcryptjs";
import * as zod from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const { email, password, confirmPassword, name } = validatedFields.data;

    if (password != confirmPassword) {
        return {
            error: "Passwords don't match!"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserEmail = await getUserByEmail(email);

    if (existingUserEmail){
        return {
            error: "Email already in use!"
        };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    const verificationToken = await generateVerificationToken(email);

    sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
        success: "Confirmation email sent!"
    }
}
