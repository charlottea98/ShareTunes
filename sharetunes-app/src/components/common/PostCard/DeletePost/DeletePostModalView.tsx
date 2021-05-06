import React from 'react';

import classes from './deletePost.module.scss';

interface Props {
    abortButtonClicked: () => void,
    confirmDeleteButtonClicked: () => void
}

const DeletePostModalView: React.FC<Props> = ({
    abortButtonClicked,
    confirmDeleteButtonClicked
}) => {

    return (
        <>
            <div className={classes.DeletePostModalBG} onClick={abortButtonClicked}/>

            <div className={classes.DeletePostModalContainer} >
                <div>Do you want to delete this post?</div>

                <div className={classes.buttonContainer}>
                    <div onClick={abortButtonClicked}>No, take me back</div>
                    <div onClick={confirmDeleteButtonClicked}>Yes, delete it</div>
                </div>
            </div>
        </>
    )
}

export default DeletePostModalView;