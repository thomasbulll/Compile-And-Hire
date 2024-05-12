"use client";

import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { editPost } from "@/actions/edit-post";
import { useTransition, useState } from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { EditPostSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

interface PostProps {
    id: string;
    title: string;
    compensation: string | null;
    description: string;
    company: string;
    creationTime: Date;
    expirationDate: Date | null;
    userId: string;
}


export const EditPostForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const postId = searchParams.get("id")

    const form = useForm<zod.infer<typeof EditPostSchema>>({
        resolver: zodResolver(EditPostSchema),
        defaultValues: {
            id: postId || undefined,
        }
    })
 
    const onSubmit = (values: zod.infer<typeof EditPostSchema>) => {
        startTransition(() => {
            editPost(values)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                }

                if (data.success) {
                    setSuccess(data.success);
                }
            }).catch(() => {
                setError("Something went wrong!");
            })
        })
    }

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5">
            <Card className="w-[600px]">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        Edit Post
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form 
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={"Title"}
                                                disabled={isPending} />
                                        </FormControl>
                                    </FormItem>;
                                }}
                                />
                                <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                        <Textarea
                                            placeholder={ "Description"}
                                            disabled={isPending}
                                            {...field}
                                        />
                                        </FormControl>
                                    </FormItem>;
                                }}
                                />
                                <FormField
                                control={form.control}
                                name="compensation"
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>
                                            Compensation
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={"Compensation"}
                                                disabled={isPending} />
                                        </FormControl>
                                    </FormItem>;
                                }}
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
                                                "pl-3 text-left font-normal",
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
                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button
                            disabled={isPending}
                            type="submit"
                            >
                                Save
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
