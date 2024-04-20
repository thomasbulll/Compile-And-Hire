import * as zod from "zod";

export const LoginSchema = zod.object({
    email:zod.string().email({
        message: "Email is required"
    }),
    password: zod.string().min(1, {
        message: "Password is required"
    })
});

export const RegisterSchema = zod.object({
    email:zod.string().email({
        message: "Email is required"
    }),
    password: zod.string().min(6, {
        message: "Minimum of 6 characters required"
    }),
    name: zod.string().min(2, {
        message: "Name is required"
    })
});

export const ResetSchema = zod.object({
    email:zod.string().email({
        message: "Email is required"
    })
});