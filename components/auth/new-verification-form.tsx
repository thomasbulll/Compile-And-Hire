"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export const NewVerificationFom = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (token) {
            newVerification(token).then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong.")
            });
        }else{
            setError("Missing Token")
        }
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

    return (
        <CardWrapper
        headerLabel="Confirm your verification"
        headerTitle="Verify accoount"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login">
            <div className="flex items-center w-full justify-center">
                {!success && !error &&(
                    <PulseLoader/>
                )}
                <FormError message={error}/>
                <FormSuccess message={success}/>
            </div>
        </CardWrapper>
    )
}
