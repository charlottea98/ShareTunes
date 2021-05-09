import React from 'react';

import classes from './textButton.module.scss';

interface Props {
    text: String,
    onButtonClick: () => void,
}

const TextButton : React.FC<Props> = ({text, onButtonClick}) => {
    let buttonStyle;

    buttonStyle = classes.standardStyle

    return (
        <div 
            onClick = {onButtonClick}
            className={[buttonStyle, classes.TextButton].join(" ")}
        >
            {text}
        </div>
    )
}

export default TextButton;