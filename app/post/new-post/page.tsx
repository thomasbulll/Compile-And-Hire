import { NewPostForm } from "@/components/posts/new-post-form";
import { getAllPostTags } from "@/data/posts";
import { currentUser } from "@/lib/auth";
import { redirect } from 'next/navigation'

const ServerPage = async () => {
    const user = await currentUser();

    const isUserBusiness = user?.role == "BUSINESS";

    const tags = await getAllPostTags();

    if (!isUserBusiness) {
        redirect('/');
    }

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <NewPostForm
            tags={tags}/>
        </div>
    );
};

export default ServerPage;