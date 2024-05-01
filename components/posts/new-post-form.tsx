"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const NewPostForm = () => {
    
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (success || error) return;

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
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

    return (
        <CardWrapper
        headerLabel="Create a new project!"
        headerTitle="New Post"
        backButtonHref="/"
        backButtonLabel="Back home">
            <div className="flex items-center w-full justify-center">
                <h1>New Post Form</h1>
            </div>
        </CardWrapper>
    )
}
