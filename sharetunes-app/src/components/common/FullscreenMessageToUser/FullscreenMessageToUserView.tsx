import React from 'react';

import classes from './FullscreenMessageToUser.module.scss';

interface ButtonOption {
    text: string,
    onClick: Function,
    color: 'red' | 'gray'
}

interface TextMessageOptions {
    text: string,
    styling: Object
}

interface Props {
    bigTextMessage: string,
    smallTextMessage?: TextMessageOptions,
    abortButtonOnClick: Function,
    button1?: ButtonOption,
    button2?: ButtonOption
}

const FullscreenMessageToUserView: React.FC<Props> = ({
    bigTextMessage,
    smallTextMessage,
    abortButtonOnClick,
    button1,
    button2
}) => {
    return (
        <>
            <div className={classes.FullscreenMessageToUserModalBG} onClick={() => abortButtonOnClick()}/>

            <div className={classes.FullscreenMessageToUserContainer} >
                <div className={classes.bigText}>{bigTextMessage}</div>

                {smallTextMessage 
                    ? <span style={smallTextMessage.styling}>{smallTextMessage.text}</span> 
                    : null
                }

                {
                    button1 || button2 ?
                        <div 
                            className={button1 ? classes.oneButtonContainer : classes.twoButtonContainer}
                        >
                            {button1 ? 
                                <div 
                                    onClick = {() => button1.onClick()}
                                    className = {button1.color === 'red' ? classes.redButton : classes.grayButton}
                                >{button1.text}</div> : null
                            }
                            
                            {button2 ? 
                                <div 
                                    onClick = {() => button2.onClick}
                                    className = {button2.color === 'red' ? classes.redButton : classes.grayButton}
                                >{button2.text}</div> : null
                            }
                        </div> : null
                }
                
            </div>
        </>
    )
}

export default FullscreenMessageToUserView;