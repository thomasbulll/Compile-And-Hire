'use client'

import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
    return (
      <main className="main pt-36 flex xl:flex-row flex-col gap-5 ">
        <Button>Click</Button>
        <LoginForm/>
      </main>
    );
  }
  