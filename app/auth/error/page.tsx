import {ErrorCard} from "@/components/auth/error-card";

export default function AuthErrorPage() {
    return (
      <main className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
        <ErrorCard/>
      </main>
    );
  }
  