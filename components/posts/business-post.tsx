"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deletePost } from "@/actions/delete-post";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { DeletePostSchema } from "@/schemas/index";
import * as zod from "zod";
import { zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

interface PostProps {
    id: string;
    title: string;
    compensation: string | null;
    description: string;
    company: string;
    creationTime: Date;
    expirationDate: Date | null;
    businessId: string;
}

export const BusinessPost = ({
    id,
    title,
    compensation,
    description,
    company,
    creationTime,
    expirationDate,
    businessId
}: PostProps) => {

    const editPostUrl = "/post/edit-post?id=" + id;

    const [deleteConfirmed, setDeleteConfirmed] = useState(false);

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const deletePostForm = useForm<zod.infer<typeof DeletePostSchema>>({
      resolver: zodResolver(DeletePostSchema),
      defaultValues: {
          postId: id,
          businessId: businessId,
      }
  })

    const onDeleteClicked = (values: zod.infer<typeof DeletePostSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
          deletePost(values).then((data) => {
                if (data?.error) {
                    setError(data?.error);
                }
                if (data?.success) {
                    setSuccess(data?.success);
                }
            }).catch(() => setError("Something went wrong."))
        });
    }

    return (
        <div>
          {deleteConfirmed && 
            <div>
              <p>Are you sure you want to delete item {title}?</p>
              <Button disabled={isPending} 
              onClick={deletePostForm.handleSubmit(onDeleteClicked)}>
                Confirm Delete
              </Button>
              <Button onClick={() => setDeleteConfirmed(false)}>
                Cancel
              </Button>
            </div>
          }
          {!deleteConfirmed && 
          <div className="post bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="pt-2 flex justify-between">
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              <div>
                <Button>
                  <Link href={editPostUrl}>
                    Edit Post
                  </Link>
                </Button>
                <Button variant={"destructive"}
                  onClick={() => setDeleteConfirmed(true)}>
                  <span className="pr-1">Delete</span>
                  <Trash2/>
                </Button>
              </div>
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
        }
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    );
}
