"use client";

import React from 'react'
import Image from 'next/image';
import CustomButton from './CustomButton';
import { redirect } from 'next/navigation';

const Hero = () => {
    const handleScroll = () => {

    }
    const handleNavigation = (str: string) => {
        return redirect(str);
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
            <CustomButton
                title="Sign in"
                containerStyles="bg-gray-100 text-black rounded-full mt-10 hover:bg-gray-200"
                handleClick={handleScroll}
            />
            <CustomButton
                title="Sign Up"
                containerStyles="bg-blue-600 text-white rounded-full mt-10 hover:bg-blue-700"
                handleClick={handleScroll}
            />
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