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
    gitHubLink: zod.optional(zod.string().max(20, {
        message: "Too many characters"
    })),
    isTwoFactorEnabled: zod.optional(zod.boolean()),
});

export const NewPostSchema = zod.object({
    title: zod.string().min(6, {
        message: "Minimum of 6 characters required"
    }),
    compensation: zod.optional(zod.number()),
    description: zod.string().min(20, {
        message: "Minimum of 20 characters required"
    }),
    company: zod.string()
});
