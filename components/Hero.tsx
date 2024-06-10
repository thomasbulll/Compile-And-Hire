"use client";

import React from 'react'
import Image from 'next/image';
import CustomButton from './CustomButton';
import Link from "next/link";
import { LoginButton } from './auth/login-button';
import { Button } from '@/components/ui/button';

const Hero = () => {
    const handleScroll = () => {

    }

  return (
    <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="2xl:text-[72px] sm:text-[64px] text-[50px] font-extrabold">
                Connecting students with employers!
            </h1>
            <p className="text-[27px] text-black-100 font-light mt-5">
                Discover opportunitues, build projects, and launch your career.
            </p>
            <div className="flex space-x-2">
                <div className="pr-5">
                <Button variant={"heroSecondary"} size={"hero"}>
                    <Link href="/" className=" px-5 py-3 font-bold rounded-md">
                        Sign In!
                    </Link>
                </Button>
                </div>
                <Button variant={"heroPrimary"} size={"hero"}>
                    <Link href="/" className=" px-4 py-2 font-bold rounded-md">
                        Sign Up!
                    </Link>
                </Button>
            </div>
        </div>
        <div className='xl:flex-[1.5] flex justify-end items-end w-full xl:h-screen'>
            <div className='relative xl:w-full w-[90%] xl:h-full h-[590px] z-0'>
                <Image
                    src="/hero.png"
                    alt="hero"
                    fill className='object-contain'
                />
            </div>

        </div>
    </div>
  )
}

export default Hero