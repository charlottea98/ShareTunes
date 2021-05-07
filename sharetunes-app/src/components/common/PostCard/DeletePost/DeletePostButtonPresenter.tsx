import React, { useState } from 'react';
import { DatabaseHandler } from '../../../../utility/databaseHandler';
import DeletePostButtonView from './DeletePostButtonView';
import DeletePostModalView from './DeletePostModalView';

interface Props {
    postId: string
}

const DeletePostButtonPresenter: React.FC<Props> = ({postId}) => {
    const [displayDeleteModal, setDisplayDeleteModal] = useState<boolean>(false);

    const deleteIconClickedHandler = () => {
        setDisplayDeleteModal(true);
    }

    const abortButtonClicked = () => {
        setDisplayDeleteModal(false);
    }

    const confirmDeleteButtonClicked = () => {
        DatabaseHandler.deletePost(postId);
        
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