"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user-button";
import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useTransition, useState } from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
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
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const currentUser = useCurrentUser();

    const form = useForm<zod.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: currentUser?.name || undefined,
            isTwoFactorEnabled: currentUser?.isTwoFactorEnabled || undefined,
        }
    })
 
    const onSubmit = (values: zod.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
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
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <Card className="w-[600px]">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        Settings
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
                                name="name"
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Username"
                                                disabled={isPending} />
                                        </FormControl>
                                    </FormItem>;
                                }}
                                />
                                <FormField
                                control={form.control}
                                name="gitHubLink"
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>
                                            Github Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="github.com/username"
                                                disabled={isPending} />
                                        </FormControl>
                                    </FormItem>;
                                }}
                                />
                                <FormField
                                control={form.control}
                                name="isTwoFactorEnabled"
                                render={({ field }) => {
                                    return <FormItem
                                        className="flex flex-row items-center
                                        justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>
                                                    Two Factor Authentication
                                                </FormLabel>
                                                {!currentUser?.isTwoFactorEnabled && (
                                                <FormDescription>
                                                    Enable Two Factor Authentication for your account
                                                </FormDescription>
                                                )}
                                                {currentUser?.isTwoFactorEnabled && (
                                                <FormDescription>
                                                    Disable Two Factor Authentication for your account
                                                </FormDescription>
                                                )}
                                            </div>
                                        <FormControl>
                                            <Switch
                                            disabled={isPending}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>;
                                }}
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

export default SettingsPage