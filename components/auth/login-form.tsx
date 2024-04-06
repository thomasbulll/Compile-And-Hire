"use client";

import * as zod from "zod";
import { LoginSchema } from "@/schemas";
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

export const LoginForm = () => {
    const form = useForm<zod.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    return (
        <CardWrapper
        headerLabel="Welcome back!"
        backButtonHref="/auth/register"
        backButtonLabel="Don't have an account?"
        showSocial>
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(() => {})}
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
                                    placeholder="email@example.com"
                                    type="email"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>

                </form>
            </Form>
        </CardWrapper>
    )
}
