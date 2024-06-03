import { currentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProfilePage = async () => {
    const user = await currentUser();
    
    const isBusiness =  user?.role == "BUSINESS"

    console.log(user?.urls);

    const hasUrl = user?.urls != undefined;

    return (
        <div className="main pt-36 flex justify-center items-center xl:flex-row flex-col gap-5">
            {isBusiness ? (
                <div className="flex flex-col items-center space-y-4">
                <div className="text-xl font-bold">{user.name}</div>
                <div className="text-gray-500">{user.bio}</div>
                {hasUrl && (
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500 hover:underline">Company Website</span>
                    <a href={user.urls} className="text-gray-500 hover:text-blue-500">
                      {user.urls}
                    </a>
                  </div>
                )}
              </div>
            ) : (
            <div>
                User
            </div>
            )}
        </div>
    );
};

export default ProfilePage;
