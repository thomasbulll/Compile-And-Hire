import {LargeCardWrapper} from "@/components/auth/large-card-wrapper";
import Link from "next/link";
import Image from 'next/image';

export const ChooseRegisterTypeForm = () => {
    return (
        <LargeCardWrapper
        headerLabel="Choose what type of account you want"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account?"
        headerTitle="Register">
            <div className="w-full flex justify-center items-center">
                <div className="flex justify-center">
                    <div className="mr-4 items-center border-0">
                        <Link href="/auth/business-register">
                        <a>Business</a>
                        <div className="pr-50">
                            <Image
                                width="250"
                                height = "250"
                                src="/cartoon-office.jpg"
                                alt="hero"
                                className='object-contain'
                            />
                        </div>
                        </Link>
                    </div>
                    <div className="border-0">
                        <Link href="/auth/student-register">
                        <a>Student</a>
                        <div>
                            <Image
                                width="250"
                                height = "250"
                                src="/cartoon-graduation-hat.jpg"
                                alt="hero"
                                className='object-contain'
                            />
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </LargeCardWrapper>
    )
}
