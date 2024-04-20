import { db } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (
    email: string
) => {
    try {
        const verificationToken = await db.passwordResetToken.findFirst({
            where: { email }
        });
        return verificationToken;
    } catch {
        return null
    }
}

export const getPasswordResetTokenByToken = async (
    token: string
) => {
    try {
        const passwordToken = await db.passwordResetToken.findUnique({
            where: { token }
        });
        return passwordToken;
    } catch {
        return null
    }
}
