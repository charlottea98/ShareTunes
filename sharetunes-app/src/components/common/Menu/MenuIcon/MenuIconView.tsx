import React from 'react';
import classes from './menuIcon.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface Props {
    icon: any,
    height: string,
    active: boolean,
    iconClickHandler: () => void
}

const MenuIconView: React.FC<Props> = ({icon, height, active, iconClickHandler}) => {
    const iconColor = active ? "#fec46e" : "#232323";

    return (
        <div 
            className={classes.MenuIcon}
            style = {{
                "fontSize": height
            }}
            onClick = {iconClickHandler}
        >
            <FontAwesomeIcon icon={icon} color={iconColor} />
    </div>
    )
}

export default MenuIconView;