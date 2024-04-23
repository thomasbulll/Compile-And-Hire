'use client'

import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
    return (
      <main className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
        <LoginForm/>
      </main>
    );
  }
  