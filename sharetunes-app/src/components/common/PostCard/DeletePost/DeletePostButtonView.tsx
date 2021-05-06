import React from 'react';
import classes from './deletePost.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';


interface Props {
    onClickHandler: () => void
}

const DeletePostButtonView: React.FC<Props> = ({onClickHandler}) => {

    return (
        <div
            className = {classes.DeletePostButton}
            onClick = {onClickHandler}
        >
            <FontAwesomeIcon icon={faTrashAlt} />
        </div>
    )
}

export default DeletePostButtonView;