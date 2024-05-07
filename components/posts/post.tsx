"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PostProps {
    id: string;
    title: string;
    compensation: string | null;
    description: string;
    company: string;
    creationTime: Date;
    expirationDate: Date | null;
}

export const Post = ({
    id,
    title,
    compensation,
    description,
    company,
    creationTime,
    expirationDate,
}: PostProps) => {

    const editPostUrl = "/post/edit-post?id=" + id;

    return (
        <div className="post bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div className="pt-2 flex justify-between">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <Button>
              <Link href={editPostUrl}>
                Edit Post
              </Link>
            </Button>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-gray-700 mr-2">at {company}</p>
            {compensation && (
              <div className="cursor-default">
                  <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="inline-block bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">$ {compensation}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compensation upon project completion</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex justify-between text-gray-500 text-sm">
            <p>Created: {creationTime.toLocaleDateString()}</p>
            {expirationDate && (
                <p>Expires: {expirationDate.toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>
    );
}
