
import { EditPostForm } from "@/components/posts/edit-post-form";

const EditPostPage = async () => {


    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <EditPostForm/>
        </div>
    );
};

export default EditPostPage;