import React from 'react';
import classes from '../deletePostAndComment.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


interface Props {
    onClickHandler: () => void
}

const DeleteCommentButtonView: React.FC<Props> = ({onClickHandler}) => {
    return (
        <div
            className = {classes.DeleteCommentButton}
            onClick = {onClickHandler}
        >
            <FontAwesomeIcon icon={faTrashAlt} />
        </div>
    )
}

export default DeleteCommentButtonView;