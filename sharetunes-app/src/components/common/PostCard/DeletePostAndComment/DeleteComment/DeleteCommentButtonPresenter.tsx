import React, { useState } from 'react';
import { DatabaseHandler } from '../../../../../utility/databaseHandler';
import DeleteCommentButtonView from './DeleteCommentButtonView';
import DeleteModalView from '../DeleteModalView';

interface Props {
    postId: string,
    commentId: string,
    comment: string
}

const DeleteCommentButtonPresenter: React.FC<Props> = ({postId, commentId, comment}) => {
    const [displayDeleteModal, setDisplayDeleteModal] = useState<boolean>(false);

    const deleteIconClickedHandler = () => {
        setDisplayDeleteModal(true);
    }

    const abortButtonClicked = () => {
        setDisplayDeleteModal(false);
    }

    const confirmDeleteButtonClicked = () => {
        DatabaseHandler.deleteComment(postId, commentId);
        
        setDisplayDeleteModal(false);
    }

    return (
        <>
            <DeleteCommentButtonView onClickHandler={deleteIconClickedHandler} />
            {displayDeleteModal ? <DeleteModalView 
                abortButtonClicked = {abortButtonClicked}
                confirmDeleteButtonClicked = {confirmDeleteButtonClicked}
                message = "Do you want to delete this comment?"
                message2 = {comment}
            /> : null}
        </>
    );
}

export default DeleteCommentButtonPresenter;