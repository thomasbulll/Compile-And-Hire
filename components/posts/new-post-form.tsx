"use client";

import { useState, useTransition } from "react";
import * as zod from "zod";
import { NewPostSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import Link from "next/link";
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { format } from "date-fns";
import { zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { newPost } from "@/actions/new-post";

export const NewPostForm = () => {

    const currentUser = useCurrentUser();

    const form = useForm<zod.infer<typeof NewPostSchema>>({
        resolver: zodResolver(NewPostSchema),
        defaultValues: {
            title: "",
            description: "",
            company: currentUser?.name || "",
            userId: currentUser?.id
        }
    })

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: zod.infer<typeof NewPostSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newPost(values).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data?.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data?.success);
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
                                name="expirationDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Post Expiration</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                            date < new Date()
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Choose when your post is due to expire.
                                    </FormDescription>
                                    <FormMessage />
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
                        Create New Post
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}
