"use client";

import { useState, useTransition } from "react";
import * as zod from "zod";
import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper"
import {useForm} from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

export const RegisterForm = () => {

    const form = useForm<zod.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: zod.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success)
            })
        })
    }

    return (
        <CardWrapper
        headerLabel="Create an account"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account?"
        headerTitle="Register"
        showSocial>
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="email@example.com"
                                    type="email"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usernme</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="username"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="******"
                                    type="password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Create an account
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}