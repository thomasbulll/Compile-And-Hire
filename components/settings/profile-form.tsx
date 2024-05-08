"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as zod from "zod";
import { FormError } from "@/components/form-error";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { SettingsSchema } from "@/schemas"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Switch } from "../ui/switch";
import { useState, useTransition } from "react";
import { settings } from "@/actions/settings";

export const ProfileForm = () => {
    
const currentUser = useCurrentUser();

const [isPending, startTransition] = useTransition();
const [error, setError] = useState<string | undefined>("");

const form = useForm<zod.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
        name: currentUser?.name || undefined,
        isTwoFactorEnabled: currentUser?.isTwoFactorEnabled || undefined,
        // urls: currentUser?.urls || undefined,
        bio: currentUser?.bio || undefined,
    }
})


//   const { fields, append } = useFieldArray({
//     name: "urls",
//     control: form.control,
//   })


  const onSubmit = (values: zod.infer<typeof SettingsSchema>) => {
    startTransition(() => {
        settings(values)
        .then((data) => {
            if (data.success) {
                console.log(JSON.stringify(values, null, 2));
                toast({
                    title: "You submitted the following values:",
                    description: (
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                      </pre>
                    ),
                })
            }
        }).catch(() => {
            setError("Something went wrong!");
        })
    })
}

    function append(arg0: { value: string; }): void {
        throw new Error("Function not implemented.");
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {/* {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))} */}
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
          {/* <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button> */}
        </div>
        <FormError message={error} />
        <Button
        type="submit"
        disabled={isPending}>
            Update profile
        </Button>
      </form>
    </Form>
  )
}