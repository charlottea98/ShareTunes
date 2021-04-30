import React from 'react';

import classes from './logo.module.scss';

interface Props {
    logoClickedHandler: () => void,
    fontSize?: string
}

const LogoView : React.FC<Props> = ({logoClickedHandler, fontSize="25px"}) => {
    return (
        <div 
            className={classes.Logo} 
            style= {{
                "fontSize": fontSize
            }}
            onClick={logoClickedHandler}
        >ShareTunes</div>
    )        
}


export default LogoView;