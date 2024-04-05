import React from 'react'
import Link from 'next/link';
// import Image from 'next/image';
import { CustomButton } from '@/components';


const NavBar = () => {
  return (
    <header className="w-full absolute z-10">
        <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
            <Link href="" className='flex justify-center items-center'>
                Home
            </Link>

            <CustomButton
                title='Sign in'
                btnType='button'
                containerStyles='bg-gray-100 text-primary-blue rounded-full bg-white min-w-[130px] hover:bg-gray-200'
            />
        </nav>
    </header>
  )
}

export default NavBar