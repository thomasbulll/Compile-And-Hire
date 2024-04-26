import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
    const user = await currentUser();

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <UserInfo 
            user={user}
            label="User"
            />
        </div>
    );
};

export default ServerPage;