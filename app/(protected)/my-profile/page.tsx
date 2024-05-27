import { currentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfilePage = async () => {
    const user = await currentUser();  

    return (
        <div className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
            <Card className="w-[1500px] shadow-md">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        My Profile
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
