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
import { StudentSettingsSchema, BusinessSettingsSchema } from "@/schemas"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Switch } from "../ui/switch";
import { useState, useTransition } from "react";
import { StudentSettings, BusinessSettings } from "@/actions/settings";

export const ProfileForm = () => {
    
const currentUser = useCurrentUser();

const [isPending, startTransition] = useTransition();
const [error, setError] = useState<string | undefined>("");

  let studentForm = useForm<zod.infer<typeof StudentSettingsSchema>>({
    resolver: zodResolver(StudentSettingsSchema),
    defaultValues: {
        name: currentUser?.name || undefined,
        isTwoFactorEnabled: currentUser?.isTwoFactorEnabled || undefined,
        bio: currentUser?.bio || undefined,
    }
})

const isStudent = currentUser?.role == "USER";
    const businessForm = useForm<zod.infer<typeof BusinessSettingsSchema>>({
      resolver: zodResolver(BusinessSettingsSchema),
      defaultValues: {
          name: currentUser?.name || undefined,
          isTwoFactorEnabled: currentUser?.isTwoFactorEnabled || undefined,
          bio: currentUser?.bio || undefined,
      }
  })


  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: studentForm.control,
  })

//   for (let i = 0; i < (currentUser?.urls.length || 0); i++) {
//     fields.append({ value: currentUser?.urls[i] });
//   }

const onBusinessSubmit = (values: zod.infer<typeof BusinessSettingsSchema>) => {
  startTransition(() => {
    BusinessSettings(values)
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
    }).catch(() => {
        setError("Something went wrong!");
    })
}) 
}

  const onStudentSubmit = (values: zod.infer<typeof StudentSettingsSchema>) => {
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
        }).catch(() => {
            setError("Something went wrong!");
        })
    }) 
}

  return (
    <div>
      {!isStudent && (
        <Form {...businessForm}>
          <form onSubmit={businessForm.handleSubmit(onBusinessSubmit)} className="space-y-8">
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
      )}
      {isStudent && (
        <Form {...studentForm}>
        <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-8">
            <FormField
              control={studentForm.control}
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
            control={studentForm.control}
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
              control={studentForm.control}
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
          <div>
            {fields.map((field, index) => (
              <FormField
                control={studentForm.control}
                key={field.id}
                name={`urls.${index}.value`}
                defaultValue={field.value}
                render={({ field }) => (
                  <div className="">
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
                          <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="ml-2"
                              onClick={() => remove(index)} // Call remove function with index
                              >
                              Remove
                          </Button>
                      </FormItem>
                  </div>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div>
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
