import { UserPosts } from "@/components/posts/view-posts";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
    const user = await currentUser();

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <UserPosts
            userId={user?.id || ""}/>
        </div>
    );
};

export default ServerPage;