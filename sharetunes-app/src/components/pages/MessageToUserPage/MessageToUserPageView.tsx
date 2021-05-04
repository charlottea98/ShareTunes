import React, { useEffect, useState } from 'react';
import classes from './messageToUserPage.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown as farFaFrown } from '@fortawesome/free-regular-svg-icons';
import { faGrinAlt as farFaGrinAlt } from '@fortawesome/free-regular-svg-icons';

import { useHistory } from 'react-router-dom';

interface Props {
    emotion: "happy" | "sad",
    message: string,
    actionButtonFunc: Function,
    actionButtonText: string,
}

const MessageToUserPageView: React.FC<Props> = ({
    emotion, 
    message, 
    actionButtonFunc, 
    actionButtonText, 
}) => {
    const history = useHistory();

    return (
        <div className={classes.PageNotFound}>
            <h1 style = {{
                "fontWeight": 300,
                "fontStyle": "italic",
                "marginBottom": "10px"
            }}>{emotion === "sad" ? "Oh no!" : "Cool!"}</h1>

            <div className={classes.infoBox}>
                <div>{message}</div>
                <FontAwesomeIcon icon={emotion === "sad" ? farFaFrown : farFaGrinAlt} color="#FEC46E" size="2x" />
            </div>

            <div 
                className = {classes.loginPageButton}
                onClick = {() => actionButtonFunc()}
            >{actionButtonText}</div>    
        </div>
    )
}

export default MessageToUserPageView;