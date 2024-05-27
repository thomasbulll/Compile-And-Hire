"use server";

import * as zod from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_NON_LOGGED_IN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
    values: zod.infer<typeof LoginSchema>,
    callbackUrl?: string | null
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const {email, password, code} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: "Email does not exist!"
        }
    }

    if (!existingUser.emailVerified && existingUser.email) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return {
            success: "Confirmation email sent!"
        }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(email);

            if (!twoFactorToken || twoFactorToken.token != code) {
                return { error: "Invalid Code!" }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: "Code expired!" }
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });

        }else{
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token)
        }

        return { twoFactor: true};
    }
    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_NON_LOGGED_IN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type){
                case "CredentialsSignin":
                    return { error: "Invalid Credentials." }
                default:
                    return{ error: "Something went wrong." }
            }
        }
        throw error;
    }
}