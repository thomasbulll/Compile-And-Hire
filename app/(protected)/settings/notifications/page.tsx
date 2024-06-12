"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { notificationsFormSchema } from "@/schemas/index";
import {useForm} from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";

export default function SettingsNotificationsPage() {

      const form = useForm<zod.infer<typeof notificationsFormSchema>>({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues: {
        }
    })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator/>
      <div className="pt-">
        <strong className="text-lg text-destructive">
          Unable to change notifications currently.
        </strong>
      </div>
      <Separator />
        <Form {...form}>
            <form onSubmit={() => {
                console.log("Notification Change!")
            }} className="space-y-8">
                <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Notify me about...</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled
                        className="flex flex-col space-y-1"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="all" />
                            </FormControl>
                            <FormLabel className="font-normal">
                            All new messages
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="mentions" />
                            </FormControl>
                            <FormLabel className="font-normal">
                            Direct messages and mentions
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="none" />
                            </FormControl>
                            <FormLabel className="font-normal">Nothing</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div>
                <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="communication_emails"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                            Communication emails
                            </FormLabel>
                            <FormDescription>
                            Receive emails about your account activity.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            disabled
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="marketing_emails"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                            Marketing emails
                            </FormLabel>
                            <FormDescription>
                            Receive emails about new products, features, and more.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            disabled
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="social_emails"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Social emails</FormLabel>
                            <FormDescription>
                            Receive emails for friend requests, follows, and more.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            disabled
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="security_emails"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Security emails</FormLabel>
                            <FormDescription>
                            Receive emails about your account activity and security.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled
                            aria-readonly
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                </div>
                </div>
                <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        disabled
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        Use different settings for my mobile devices
                        </FormLabel>
                        <FormDescription>
                        You can manage your mobile notifications in the{" "}
                        <Link href="/examples/forms">mobile settings</Link> page.
                        </FormDescription>
                    </div>
                    </FormItem>
                )}
                />
                <Button 
                type="submit"
                disabled
                >
                    Update notifications
                </Button>
            </form>
        </Form>
    </div>
  )
}