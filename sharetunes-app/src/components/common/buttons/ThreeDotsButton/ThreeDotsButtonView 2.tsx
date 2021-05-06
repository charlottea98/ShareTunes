import React from 'react';

import classes from './threeDotsButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

interface Props {
    bulletDiameter: string,
    bulletDistance: string
}

const ThreeDotsButtonView : React.FC<Props> = ({bulletDiameter, bulletDistance}) => {
    return (
        <div className={classes.ThreeDotsButton} >
            <FontAwesomeIcon icon={faEllipsisH} color="#232323" size="lg" />
        </div>
    )
}

export default ThreeDotsButtonView;