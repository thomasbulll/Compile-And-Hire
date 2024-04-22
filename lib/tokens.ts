import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import {v4 as uuid} from "uuid";
import { db } from "@/lib/db";
import crypto from "crypto";

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

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();

    // Expires after 15 minutes
    const expires = new Date(new Date().getTime() + (900 * 1000));

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorConfirmation.delete({
            where: { id: existingToken.id }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return twoFactorToken;
}
