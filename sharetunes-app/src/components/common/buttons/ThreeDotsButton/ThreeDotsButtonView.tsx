import React from 'react';

import classes from './threeDotsButton.module.scss';

interface Props {
    bulletDiameter: string,
    threeDotsWidth: string
}

const ThreeDotsButtonView : React.FC<Props> = ({bulletDiameter, threeDotsWidth}) => {
    return (
        <div 
            className={classes.ThreeDotsButton}
            style = {{
                "width": threeDotsWidth
            }}
        >
            <div 
                className={classes.bullet}
                style = {{
                    "width": bulletDiameter,
                    "height": bulletDiameter
                }}
            />
            
        </div>
    )
}

export default ThreeDotsButtonView;