interface DeleteConfirmProps {
    postId: string;
    title: string;
    onConfirmDelete: (id: string) => void;
    onClose: () => void;
  }

  export const DeleteConfirm = ({
    postId,
    title,
    onConfirmDelete,
    onClose
  }: DeleteConfirmProps) => {
    return (
      <div>
        <p>Are you sure you want to delete item {title}?</p>
        <button onClick={() => onConfirmDelete(postId)}>Confirm Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  };
  
  export default DeleteConfirm;