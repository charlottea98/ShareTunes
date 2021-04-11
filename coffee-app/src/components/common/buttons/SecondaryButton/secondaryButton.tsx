import React from 'react';

import classes from './secondaryButton.module.scss';

interface Props {
    children: React.ReactNode,
    onButtonClick: () => void
}

const SecondaryButton : React.FC<Props> = ({children, onButtonClick}) => {

    return (
        <div 
            onClick = {onButtonClick}
            className={classes.SecondaryButton}
        >
            {children}
        </div>
    )
}

export default SecondaryButton;