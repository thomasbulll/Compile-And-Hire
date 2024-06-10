"use client";

import Link from "next/link"

export default function ChooseRegisterType() {
  return (
    <div className="main flex justify-center items-center xl:flex-row flex-col gap-5">
      <div className="grid grid-cols-2 overflow-hidden rounded-[0.5rem] border bg-background shadow w-[1500px] pt-30 h-[800px]">
        <Link className="bg-zinc-900 hover:bg-stone-800" href="/auth/business-register">
          <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0" />
            <div className="relative z-20 flex items-center text-lg font-medium">
            Business
            </div>
          </div>
        </Link>
        <Link className="bg-stone-900 hover:bg-zinc-800" href="/auth/student-register">
          <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
              <div className="absolute inset-0" />
              <div className="relative z-20 flex items-center text-lg font-medium">
              Student
              </div>
          </div>
        </Link>
    </div>

    </div>
  )
  }
  