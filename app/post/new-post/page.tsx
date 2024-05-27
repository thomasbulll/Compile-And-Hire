import { NewPostForm } from "@/components/posts/new-post-form";
import { currentUser } from "@/lib/auth";
import { redirect } from 'next/navigation'

const ServerPage = async () => {
    const user = await currentUser();

    const isUserBusiness = user?.role == "BUSINESS";

    if (!isUserBusiness) {
        redirect('/');
    }

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <NewPostForm />
        </div>
    );
};

export default ServerPage;