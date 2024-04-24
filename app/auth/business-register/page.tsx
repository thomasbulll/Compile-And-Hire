'use client'

import { BusinessRegisterForm } from '@/components/auth/business-register-form';

export default function StudentRegisterPage() {
    return (
      <main className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
        <BusinessRegisterForm />
      </main>
    );
  }
  