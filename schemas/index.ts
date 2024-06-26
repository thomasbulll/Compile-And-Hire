import { UserRole } from "@prisma/client";
import * as zod from "zod";

export const LoginSchema = zod.object({
    email:zod.string().email({
        message: "Email is required"
    }),
    password: zod.string().min(1, {
        message: "Password is required"
    }),
    code: zod.optional(zod.string())
});

export const RegisterSchema = zod.object({
    email:zod.string().email({
        message: "Email is required"
    }),
    password: zod.string().min(6, {
        message: "Minimum of 6 characters required"
    }),
    confirmPassword: zod.string().min(6, {
        message: "Minimum of 6 characters required"
    }),
    name: zod.string().min(2, {
        message: "Name is required"
    }),
    role: zod.string()
});

export const ResetSchema = zod.object({
    email:zod.string().email({
        message: "Email is required"
    })
});

export const NewPasswordSchema = zod.object({
    password: zod.string().min(6, {
        message: "Minimum of 6 characters required"
    })
});

export const SettingsSchema = zod.object({
    name: zod.optional(zod.string()),
    isTwoFactorEnabled: zod.optional(zod.boolean()),
    bio: zod.optional(zod.string().max(160).min(4)),
    urls: zod.optional(zod.string().url({
        message: "Please enter a valid URL"
    }))
});

export const NewPostSchema = zod.object({
    title: zod.string().min(6, {
        message: "Minimum of 6 characters required"
    }),
    compensation: zod.optional(zod.string()),
    description: zod.string().min(20, {
        message: "Minimum of 20 characters required"
    }),
    company: zod.string(),
    expirationDate: zod.optional(zod.date()),
    userId: zod.string()
});

export const EditPostSchema = zod.object({
    id: zod.string(),
    title: zod.optional(zod.string().min(6, {
        message: "Minimum of 6 characters required"
    })),
    compensation: zod.optional(zod.string()),
    description: zod.optional(zod.string().min(20, {
        message: "Minimum of 20 characters required"
    })),
    expirationDate: zod.optional(zod.date())
});


export const DeletePostSchema = zod.object({
    postId: zod.string(),
    businessId: zod.string(),
});


export const notificationsFormSchema = zod.object({
    type: zod.enum(["all", "mentions", "none"], {
      required_error: "You need to select a notification type.",
    }),
    mobile: zod.boolean().default(false).optional(),
    communication_emails: zod.boolean().default(false).optional(),
    social_emails: zod.boolean().default(false).optional(),
    marketing_emails: zod.boolean().default(false).optional(),
    security_emails: zod.boolean(),
  })
  