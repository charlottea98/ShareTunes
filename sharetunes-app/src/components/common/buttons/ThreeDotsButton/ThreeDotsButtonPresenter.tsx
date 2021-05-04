import React from 'react';

import ThreeDotsButtonView from './ThreeDotsButtonView';

interface Props {
    size: 'S' | 'M' | 'L'
}

const ThreeDotsButtonPresenter : React.FC<Props> = ({size}) => {
    let bulletDiameter, bulletDistance;

    if (size === 'S') {
        bulletDiameter = "3px";
        bulletDistance = "5px";
    } else if (size === 'M') {
        bulletDiameter = "5px";
        bulletDistance = "7px";
    } else { // size === 'L'
        bulletDiameter = "10px";
        bulletDistance = "9px";
    } 

    return (
        <ThreeDotsButtonView
            bulletDiameter = {bulletDiameter}
            bulletDistance = {bulletDistance}
        />
    )
}

export default ThreeDotsButtonPresenter;