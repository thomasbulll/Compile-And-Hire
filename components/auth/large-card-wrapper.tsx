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

interface LargeCardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean,
    headerTitle: string;
}

export const LargeCardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    headerTitle
}: LargeCardWrapperProps) => {
    return(
        <Card
        className="w-[800px] shadow-md">
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