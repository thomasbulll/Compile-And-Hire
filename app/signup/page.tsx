import { SignupForm } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await getServerSession();
    if (session) {
      redirect('/');
    }
    return (
      <SignupForm/>
    );
  }
  