import { UserPosts } from "@/components/posts/view-posts";
import { postsByuserId } from "@/data/posts";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
    const user = await currentUser();

    const posts = await postsByuserId(user?.id || "")

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <UserPosts
            companyName={user?.name || ""}
            posts={posts}/>
        </div>
    );
};

export default ServerPage;