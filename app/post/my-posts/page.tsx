import { UserPosts } from "@/components/posts/view-posts";
import { getBusinessByUserId } from "@/data/business";
import { postsByBusinessId } from "@/data/posts";
import { currentUser } from "@/lib/auth";
import { redirect } from 'next/navigation'

const ServerPage = async () => {
    const user = await currentUser();
    const isUserBusiness = user?.role == "BUSINESS";

    if (!isUserBusiness) {
        redirect('/');
    }

    const business = await getBusinessByUserId(user?.id)

    const posts = await postsByBusinessId(business?.id)

    return (
        <div className="flex main justify-center items-center xl:flex-row flex-col gap-5 pt-36">
            <UserPosts
            businessId = {business?.id || ""}
            companyName={user?.name || ""}
            posts={posts}/>
        </div>
    );
};

export default ServerPage;