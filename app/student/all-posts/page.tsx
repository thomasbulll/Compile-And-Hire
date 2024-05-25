import { ViewAllPosts } from "@/components/posts/view-all-posts";
import { getMostRecentPosts } from "@/data/posts";

const AllPostsPage = async () => {
    const posts = await getMostRecentPosts();

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <ViewAllPosts
            posts={posts}/>
        </div>
    );
};

export default AllPostsPage;