"use client";

import React from 'react'
import Image from 'next/image';
import CustomButton from './CustomButton';
import Link from "next/link";
import { LoginButton } from './auth/login-button';

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
            <Link href={"/auth/login"}>
                <CustomButton
                title="Sign in"
                containerStyles="bg-gray-100 text-black rounded-full mt-10 hover:bg-gray-200"
                handleClick={handleScroll}
                />
            </Link>
            <Link href={"/auth/register"}>
                <CustomButton
                    title="Sign Up"
                    containerStyles="bg-blue-600 text-white rounded-full mt-10 hover:bg-blue-700"
                    handleClick={handleScroll}
                />
            </Link>
            </div>
        </div>
        <div className='xl:flex-[1.5] flex justify-end items-end w-full xl:h-screen'>
            <div className='relative xl:w-full w-[90%] xl:h-full h-[590px] z-0'>
                <Image
                    src="/hero.png"
                    alt="hero"
                    fill className='object-contain'
                />
                <div className="absolute xl:-top-24 xl:-right-1/2 -right-1/4 bg-hero-bg bg-repeat-round -z-10 w-full xl:h-screen h-[590px] overflow-hidden">

                </div>
            </div>

        </div>
    </div>
  )
}

export default Hero