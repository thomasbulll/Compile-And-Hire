import { EditPostForm } from "@/components/posts/edit-post-form";
import { postById } from "@/data/posts";
import { currentUser } from "@/lib/auth";

const EditPostPage = async () => {
    const user = await currentUser();

    const post = await postById(user?.id || "")

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <EditPostForm
            userId = {user?.id || ""}
            post={post}/>
        </div>
    );
};

export default EditPostPage;