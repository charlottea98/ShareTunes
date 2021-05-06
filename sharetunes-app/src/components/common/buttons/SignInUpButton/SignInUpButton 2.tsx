import React from 'react';

import classes from './SignInUpButton.module.scss';

interface Props {
    text: String,
    onButtonClick: () => void,
}

const SignInUpButton : React.FC<Props> = ({text, onButtonClick}) => {
    let buttonStyle;

    buttonStyle = classes.standardStyle

    return (
        <div 
            onClick = {onButtonClick}
            className={[buttonStyle, classes.SignInUpButton].join(" ")}
        >
            {text}
        </div>
    )
}

export default SignInUpButton;