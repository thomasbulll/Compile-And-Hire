"uce client";

import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
 } from "@/components/ui/card";

import {Header} from "@/components/auth/header"
import {Social} from "@/components/auth/social"
import {BackButton} from "@/components/auth/back-button"

interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean,
    headerTitle: string;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    headerTitle
}: CardWrapperProps) => {
    return(
        <Card
        className="w-[400px] shadow-md">
            <CardHeader>
                <Header 
                label={headerLabel} 
                title={headerTitle} 
                />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial &&  (
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
};