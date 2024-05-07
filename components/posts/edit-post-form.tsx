interface PostProps {
    id: string;
    title: string;
    compensation: number | null;
    description: string;
    company: string;
    creationTime: Date;
    expirationDate: Date | null;
    userId: string;
}

interface EditPostFormProps {
    userId: string
    post: PostProps | null;
}

export const EditPostForm = ({
    userId,
    post
}: EditPostFormProps) => {
    return (
        <h1>
            Edit Post
        </h1>
    );
}
