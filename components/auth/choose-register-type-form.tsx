import {LargeCardWrapper} from "@/components/auth/large-card-wrapper";
import Link from "next/link";

export const ChooseRegisterTypeForm = () => {
    return (
        <LargeCardWrapper
        headerLabel="Choose what type of account you want"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        headerTitle="Register">
            <div className="w-full flex justify-center items-center">
                <div>
                    <Link
                    href="/auth/business-register">
                        Business
                    </Link>
                </div>
                <div>
                    <Link
                        href="/auth/student-register">
                        Student
                    </Link>
                </div>
            </div>
        </LargeCardWrapper>
    )
}