"use client";

import { CustomButtonProps } from '@/types';
import React from 'react'

const CustomButton = ({title, containerStyles,
    handleClick, btnType}: CustomButtonProps) => {
  return (
    <button
    disabled={false}
    type={btnType || "button"}
    className={`flex flex-row relative justify-center items-center py-3 px-6 outline-none ${containerStyles}`}
    onClick={handleClick}
    >
        <span className=''>
            {title}
        </span>
    </button>
  )
}

export default CustomButton