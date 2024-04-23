'use client'

import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
    return (
      <main className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
        <RegisterForm />
      </main>
    );
  }
  