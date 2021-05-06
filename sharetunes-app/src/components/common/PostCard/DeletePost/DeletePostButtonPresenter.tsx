import React, { useState } from 'react';
import DeletePostButtonView from './DeletePostButtonView';
import DeletePostModalView from './DeletePostModalView';

interface Props {
    postId: number,
    deletePost?: Function
}

const DeletePostButtonPresenter: React.FC<Props> = ({postId, deletePost}) => {
    const [displayDeleteModal, setDisplayDeleteModal] = useState<boolean>(false);

    const deleteIconClickedHandler = () => {
        setDisplayDeleteModal(true);
    }

    const abortButtonClicked = () => {
        setDisplayDeleteModal(false);
    }

    const confirmDeleteButtonClicked = () => {
        if (deletePost) {
            deletePost(postId);
        }
        
        setDisplayDeleteModal(false);
    }

    return (
        <>
            <DeletePostButtonView onClickHandler={deleteIconClickedHandler} />
            {displayDeleteModal ? <DeletePostModalView 
                abortButtonClicked = {abortButtonClicked}
                confirmDeleteButtonClicked = {confirmDeleteButtonClicked}
            /> : null}
        </>
    );
}

export default DeletePostButtonPresenter;