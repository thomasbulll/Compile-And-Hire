import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const domainUrl = process.env.PUBLIC_APP_URL;

    const confirmLink = `${domainUrl}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm email",
        html: `<p>To confirm your email, click <a href="${confirmLink}">here</a></p>`
    })
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const domainUrl = process.env.PUBLIC_APP_URL;

    const resetLink = `${domainUrl}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm email",
        html: `<p>To reset your password, click <a href="${resetLink}">here</a></p>`
    })
}

export const sendTwoFactorEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA",
        html: `<p>Your 2FA code: ${token}</p>`
    })
}
