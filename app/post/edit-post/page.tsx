
import { EditPostForm } from "@/components/posts/edit-post-form";
import { currentUser } from "@/lib/auth";
import { redirect } from 'next/navigation'

const EditPostPage = async () => {
    const user = await currentUser();

    const isUserBusiness = user?.role == "BUSINESS"

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <EditPostForm/>
        </div>
    );
};

export default EditPostPage;