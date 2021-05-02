import React from 'react';

import ThreeDotsButtonView from './ThreeDotsButtonView';

interface Props {
    size: 'S' | 'M' | 'L'
}

const ThreeDotsButtonPresenter : React.FC<Props> = ({size}) => {
    let bulletDiameter, threeDotsWidth;

    if (size === 'S') {
        bulletDiameter = "3px";
        threeDotsWidth = "5px";
    } else if (size === 'M') {
        bulletDiameter = "5px";
        threeDotsWidth = "7px";
    } else { // size === 'L'
        bulletDiameter = "7px";
        threeDotsWidth = "9px";
    } 

    return (
        <ThreeDotsButtonView
            bulletDiameter = {bulletDiameter}
            threeDotsWidth = {threeDotsWidth}
        />
    )
}

export default ThreeDotsButtonPresenter;