import React from 'react';

import classes from './logo.module.scss';

interface Props {
    logoClickedHandler: () => void,
    clickable: boolean,
    fontSize?: string
}

const LogoView : React.FC<Props> = ({logoClickedHandler, clickable, fontSize="25px"}) => {
    return (
        <div 
            className={classes.Logo} 
            style= {{
                "fontSize": fontSize,
                "cursor": clickable ? "pointer" : "default"
            }}
            onClick={logoClickedHandler}
        >ShareTunes</div>
    )        
}


export default LogoView;