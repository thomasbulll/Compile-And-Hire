'use client';

import React, { useState } from 'react'
import Link from 'next/link';
import { logout } from '@/actions/logout';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useCurrentUser } from '@/hooks/use-current-user';

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  }

  const currentUser = useCurrentUser();

  const isBusiness = currentUser?.role == "BUSINESS"

  return (
    <nav className="w-full h-24 shadow-xl bg-white">
      <div className="flex justify-between items-center h-full w-full px-4 2x1:px-16">
        <Link href="/">
          Home
        </Link>
        <div>
          <ul className="hiddem sm:flex">
            <Link href="/student/all-posts">
              <li className="ml-10 uppercase hover:border-b text-xl">Projects</li>
            </Link>
            <Link href="/why-us">
              <li className="ml-10 uppercase hover:border-b text-xl">Why us</li>
            </Link>
            <Link href="/about">
              <li className="ml-10 uppercase hover:border-b text-xl">About</li>
            </Link>
            {isBusiness && (
              <Link href="/post/my-posts">
                <li className="ml-10 uppercase hover:border-b text-xl">My Projects</li>
              </Link>
            )}
            {currentUser && (
              <Link href="/settings/profile">
                <li className="ml-10 uppercase hover:border-b text-xl">My Profile</li>
              </Link>
            )}
            {currentUser && (
                <Link href="/">
                  <li className="mx-10 uppercase hover:border-b text-xl hover:cursor-pointer"
                  onClick={() => {
                    logout();
                  }}>
                    Sign Out
                  </li>
                </Link>
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
            <Link href="/">
              <li onClick={() => setMenuOpen(false)}>
                Home
              </li>
            </Link>
            <Link href="/student/all-posts">
            <li onClick={() => setMenuOpen(false)}>
                Projects
              </li>
            </Link>
            <Link href="/why-us">
              <li onClick={() => setMenuOpen(false)}>
                Why us
              </li>
            </Link>
            <Link href="/about">
              <li onClick={() => setMenuOpen(false)}>
                About
              </li>
            </Link>
            {currentUser && (
              <li className="mx-10 uppercase hover:border-b text-xl hover:cursor-pointer"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}>
                Sign Out
              </li>
            )}
            {!currentUser && (
              <Link href="">
                <li onClick={() => setMenuOpen(false)}>
                  Home
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
