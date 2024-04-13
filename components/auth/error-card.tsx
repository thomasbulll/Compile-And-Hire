import {CardWrapper} from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper
        headerLabel="Oops! Something went wrong!"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        headerTitle="Unexpected Error">
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon/>
            </div>
        </CardWrapper>
    )
}