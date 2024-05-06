import { NewPostForm } from "@/components/posts/new-post-form";

const ServerPage = async () => {

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <NewPostForm />
        </div>
    );
};

export default ServerPage;