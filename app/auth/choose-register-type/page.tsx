'use client'

import { ChooseRegisterTypeForm } from '@/components/auth/choose-register-type-form';

export default function ChooseRegisterTypePage() {
    return (
      <main className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
        <ChooseRegisterTypeForm />
      </main>
    );
  }
  