'use client'

import { StudentRegisterForm } from '@/components/auth/student-register-form';

export default function StudentRegisterPage() {
    return (
      <main className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
        <StudentRegisterForm />
      </main>
    );
  }
  