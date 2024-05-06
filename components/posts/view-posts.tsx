

interface UserPostsProps {
    userId: string;
}

export const UserPosts = ({
    userId: string
}: UserPostsProps) => {
    return (
        <h1>User Posts</h1>
    )
}
