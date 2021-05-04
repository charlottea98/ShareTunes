import React from 'react';

import classes from './SwitchButton.module.scss';

interface Props {
    text1: String,
    text2:String,
    onButtonClick: () => void,
}

const SwitchButton : React.FC<Props> = ({text1,text2, onButtonClick}) => {



    return (

        <div  onClick = {onButtonClick} className={[classes.SwitchButton].join(" ")} >
            
            <div className = {[classes.item1].join(" ")}>

                {text1}

            </div>

            <div className = {[classes.item2].join(" ")}>

                {text2}

            </div>


        </div>

    )
}

export default SwitchButton;