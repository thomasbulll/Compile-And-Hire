"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";

import { PulseLoader } from "react-spinners";

export const NewVerificationFom = () => {
    return (
        <CardWrapper
        headerLabel="Confirm your verification"
        headerTitle="Verify accoount"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login">
            <div className="flex items-center w-full justify-center">
                <PulseLoader/>
            </div>
        </CardWrapper>
    )
}
