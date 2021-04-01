import React from 'react';

import classes from './primaryButton.module.scss';

interface Props {
    text: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    onButtonClick: () => void
}

const PrimaryButton : React.FC<Props> = ({text, onButtonClick}) => {

    return (
        <div 
            onClick = {onButtonClick}
            className={classes.PrimaryButton}
        >
            {text}
        </div>
    )
}

export default PrimaryButton;