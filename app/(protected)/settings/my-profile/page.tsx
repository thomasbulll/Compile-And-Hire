import { currentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfilePage = async () => {
    const user = await currentUser();  

    return (
        <div className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
        </div>
    );
};

export default ProfilePage;
