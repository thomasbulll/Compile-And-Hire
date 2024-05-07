import { ViewAllPosts } from "@/components/posts/view-all-posts";
import { getMostRecentPosts } from "@/data/posts";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
    const user = await currentUser();

    const posts = await getMostRecentPosts();

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <ViewAllPosts
            posts={posts}/>
        </div>
    );
};

export default ServerPage;