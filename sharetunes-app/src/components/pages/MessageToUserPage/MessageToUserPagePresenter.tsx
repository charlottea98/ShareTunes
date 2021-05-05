import React, { useEffect, useState } from 'react';

import MessageToUserPageView from './MessageToUserPageView';

interface Props {
    emotion: "happy" | "sad",
    message: string,
    actionButtonFunc: Function,
    actionButtonText: string,
    pauseRender?: boolean
}

const MessageToUserPagePresenter: React.FC<Props> = ({
    emotion, 
    message, 
    actionButtonFunc, 
    actionButtonText, 
    pauseRender=false
}) => {
    const [renderContent, setRenderContent] = useState<boolean>(false);

    useEffect(() => {
        if (pauseRender) {
            setTimeout(() => { 
                setRenderContent(true);
            }, 500)
        } else {
            setRenderContent(true);
        }
    })

    return renderContent ? <MessageToUserPageView 
        emotion = {emotion} 
        message = {message}
        actionButtonFunc = {actionButtonFunc}
        actionButtonText = {actionButtonText}
    /> : null;

}

export default MessageToUserPagePresenter;