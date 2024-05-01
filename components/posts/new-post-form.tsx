"use client";

import { useState, useTransition } from "react";
import * as zod from "zod";
import { NewPostSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
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
// import { new-post } from "@/actions/new-post";
import { useCurrentUser } from "@/hooks/use-current-user";

export const NewPostForm = () => {

    const currentUser = useCurrentUser();

    const form = useForm<zod.infer<typeof NewPostSchema>>({
        resolver: zodResolver(NewPostSchema),
        defaultValues: {
            title: "",
            description: "",
            company: currentUser.name || ""
        }
    })

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const onSubmit = (values: zod.infer<typeof NewPostSchema>) => {
        setError("");
        setSuccess("");

        // startTransition(() => {
        //     new-post(values).then((data) => {
        //         if (data?.error) {
        //             form.reset();
        //             setError(data?.error);
        //         }
        //         if (data?.success) {
        //             form.reset();
        //             setSuccess(data?.success);
        //         }
        //         if (data?.twoFactor) {
        //             setShowTwoFactor(true);
        //         }
        //     }).catch(() => setError("Something went wrong."))
        // });
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
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Cool new project!"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="details about your awesome project!"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="compensation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comp</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Will you pay"
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
                        {showTwoFactor ? "Confirm": "Login"}
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}
