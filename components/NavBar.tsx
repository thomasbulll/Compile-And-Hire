'use client';

import React, { useState } from 'react'
import Link from 'next/link';
import CustomButton from './CustomButton';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { currentUser } from '@/lib/auth';
import { useCurrentUser } from '@/hooks/use-current-user';
import { signOut } from '@/auth';

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  }

  const currentUser = useCurrentUser();

  return (
    <nav className="fixed w-full h-24 shadow-xl bg-white">
      <div className="flex justify-between items-center h-full w-full px-4 2x1:px-16">
        <Link href="/">
          Home
        </Link>
        <div>
          <ul className="hiddem sm:flex">
            <Link href="/why-us">
              <li className="ml-10 uppercase hover:border-b text-xl">Why us</li>
            </Link>
            <Link href="/about">
              <li className="ml-10 uppercase hover:border-b text-xl">About</li>
            </Link>
            {currentUser && (
              <li className="mx-10 uppercase hover:border-b text-xl hover:cursor-pointer"
              onClick={() => {
                logout();
              }}>
                Sign Out
              </li>
            )}
            {!currentUser && (
              <Link href="/auth/choose-register-type">
              <li className="mx-10 uppercase hover:border-b text-xl">Sign Up</li>
            </Link>
            )}
          </ul>
        </div>
        <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
          <AiOutlineMenu size={25}/>
        </div>
      </div>
      <div className={
        menuOpen 
        ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-gray-400 p-10 ease-in duration-500"
        : "fixed left-[-100%] top-0 p-10 ease-in duration-1000"
      }>
        <div className="flex w-full items-center justify-end">
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineClose size={25}/>
          </div>
        </div>
        <div className="flex-col py-4">
          <ul>
            <Link href="">
              <li onClick={() => setMenuOpen(false)}>
                Home
              </li>
            </Link>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
