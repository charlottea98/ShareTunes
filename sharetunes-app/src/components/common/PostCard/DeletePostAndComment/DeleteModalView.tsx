import React from 'react';

import classes from './deletePostAndComment.module.scss';

interface Props {
    abortButtonClicked: () => void,
    confirmDeleteButtonClicked: () => void,
    message: string,
    message2?: string
}

const DeleteModalView: React.FC<Props> = ({
    abortButtonClicked,
    confirmDeleteButtonClicked,
    message,
    message2 = ""
}) => {

    return (
        <>
            <div className={classes.DeletePostModalBG} onClick={abortButtonClicked}/>

            <div className={classes.DeleteCommentModalContainer} >
                <div>{message}</div>

                {message2 !== "" ?
                    <i style={{
                        "fontWeight": 400, 
                        "fontSize": "15px", 
                        "margin": "5px 0"
                    }}>"{message2}"</i> : null
                }
                <div className={classes.buttonContainer}>
                    <div onClick={abortButtonClicked}>No, take me back</div>
                    <div onClick={confirmDeleteButtonClicked}>Yes, delete it</div>
                </div>
            </div>
        </>
    )
}

export default DeleteModalView;