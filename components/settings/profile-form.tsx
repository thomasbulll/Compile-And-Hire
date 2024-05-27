"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as zod from "zod";
import { FormError } from "@/components/form-error";

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
import { StudentSettings } from "@/actions/settings";

export const ProfileForm = () => {
    
const currentUser = useCurrentUser();

const [isPending, startTransition] = useTransition();
const [error, setError] = useState<string | undefined>("");

  let form = useForm<zod.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
        name: currentUser?.name || undefined,
        isTwoFactorEnabled: currentUser?.isTwoFactorEnabled || undefined,
        bio: currentUser?.bio || undefined,
        url: currentUser?.urls
    }
})

const isStudent = currentUser?.role == "USER";
    const businessForm = useForm<zod.infer<typeof SettingsSchema>>({
      resolver: zodResolver(SettingsSchema),
      defaultValues: {
          name: currentUser?.name || undefined,
          isTwoFactorEnabled: currentUser?.isTwoFactorEnabled || undefined,
          bio: currentUser?.bio || undefined,
          url: currentUser?.urls || undefined
      }
  })

  const onSubmit = (values: zod.infer<typeof SettingsSchema>) => {
      startTransition(() => {
        StudentSettings(values)
        .then((data) => {
            if (data.success) {
                toast({
                    title: "You submitted the following values:",
                    description: (
                      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                      </pre>
                    ),
                })
            }
        }).catch((error) => {
            console.log(error)
            setError("Something went wrong!");
        })
    }) 
}

  return (
    <div>
      {!isStudent ? (
        <Form {...businessForm}>
          <form onSubmit={businessForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
              control={businessForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your company"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={businessForm.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Company Website</FormLabel>
                <FormControl>
                  <Input placeholder="Your companies website" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={businessForm.control}
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
            <FormError message={error} />
            <Button
            type="submit"
            disabled={isPending}>
                Update profile
            </Button>
          </form>
      </Form>
      ) : (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a
                      pseudonym.
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
              </FormItem>
            )}
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
              <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>Linked Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Your website" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                  )}
                />
          <FormError message={error} />
          <Button
          type="submit"
          disabled={isPending}>
              Update profile
          </Button>
        </form>
      </Form>
      )}
    </div>
  )
}
