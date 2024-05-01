"use client";

import { useState, useTransition } from "react";
import * as zod from "zod";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
import { login } from "@/actions/login";

export const NewPostForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with other provider"
        : "";

    const form = useForm<zod.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const onSubmit = (values: zod.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data?.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data?.success);
                }
                if (data?.twoFactor) {
                    setShowTwoFactor(true);
                }
            }).catch(() => setError("Something went wrong."))
        });
    }

    return (
        <CardWrapper
        headerLabel="Create a new project!"
        headerTitle="New Post"
        backButtonHref="/"
        backButtonLabel="Back home">
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
                                    <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className="px-0 font-normal"
                                    >
                                        <Link href="/auth/reset">
                                            Forgot password?
                                        </Link>
                                    </Button>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        {showTwoFactor ? "Confirm": "Login"}
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}
