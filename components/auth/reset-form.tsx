"use client";

import { useState, useTransition } from "react";
import * as zod from "zod";
import { ResetSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper"
import {useForm} from "react-hook-form";
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

export const ResetForm = () => {

    const form = useForm<zod.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: zod.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        // startTransition(() => {
        //     login(values).then((data) => {
        //         setError(data?.error);
        //         setSuccess(data?.success);
        //     })
        // })
    }

    return (
        <CardWrapper
        headerLabel="Forgot your password"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        headerTitle="Reset"
        >
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Send reset email
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}
