import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import {v4 as uuid} from "uuid";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
}


export const generatePasswordResetToken = async (email: string) => {
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken
}