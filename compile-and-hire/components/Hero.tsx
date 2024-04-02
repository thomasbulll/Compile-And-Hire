"use client";

import React from 'react'
import Image from 'next/image';
import CustomButton from './CustomButton';
import Link from "next/link";

const Hero = () => {
    const handleScroll = () => {

    }

  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Connecting students with employers!
            </h1>
            <p className="hero__subtitle">
                Discover opportunitues, build projects, and launch your career.
            </p>
            <div className="flex space-x-2">
            <Link href={"/login"}>
                <CustomButton
                title="Sign in"
                containerStyles="bg-gray-100 text-black rounded-full mt-10 hover:bg-gray-200"
                handleClick={handleScroll}
                />
            </Link>
            <Link href={"/signup"}>
                <CustomButton
                    title="Sign Up"
                    containerStyles="bg-blue-600 text-white rounded-full mt-10 hover:bg-blue-700"
                    handleClick={handleScroll}
                />
            </Link>
            </div>
        </div>
        <div className='hero__image-container'>
            <div className='hero__image'>
                <Image
                    src="/hero.png"
                    alt="hero"
                    fill className='object-contain'
                />
                <div className="hero__image-overlay">

                </div>
            </div>

        </div>
    </div>
  )
}

export default Hero