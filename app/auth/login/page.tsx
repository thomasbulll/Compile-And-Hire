import { LoginForm } from '@/components/auth/login-form';
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="main flex justify-center items-center xl:flex-row flex-col gap-5">
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow w-[1500px] pt-30">
        <div className="md:hidden">
          <Image
            src="/examples/authentication-light.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="block dark:hidden"
          />
          <Image
            src="/examples/authentication-dark.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="hidden dark:block"
          />
        </div>
        <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            href="/auth/choose-register-type"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Don't have an account?
          </Link>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              Compile And Hire
            </div>
            {/* TODO: Add Testimony */}
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  {/* &ldquo;&rdquo; */}
                </p>
                <footer className="text-sm"></footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Login
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back!
                </p>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
  