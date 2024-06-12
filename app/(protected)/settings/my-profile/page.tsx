import { currentUser } from "@/lib/auth";
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const ProfilePage = async () => {
    const user = await currentUser();
    
    const isBusiness =  user?.role == "BUSINESS"

    console.log(user?.urls);

    const hasUrl = user?.urls != undefined;

    return (
        <div className="main flex justify-center items-center xl:flex-row flex-col gap-5">
            {isBusiness ? (
                <div className="flex flex-col space-y-4 w-[800px]">
                <div className="flex items-center">
                    <div className="pr-5">
                        <Avatar className="w-24 h-24 rounded-full shadow-md">
                            <AvatarImage src={user?.image || ""} />
                            <AvatarFallback>
                                <FaUser />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <p className="ml-4 text-xl font-bold items-center">{user.name}</p>
                </div>
                {hasUrl && (
                  <div className="flex space-x-2 float-left">
                    <Link href={user.urls}>
                        {user.urls}
                    </Link>

                  </div>
                )}
                <Separator />
                <div className="text-gray-500">{user.bio}</div>
                
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
