import * as React from 'react';
import classes from "./progressLoader.module.scss";

interface Props {

}

export var ProgressLoader : React.FC<Props> =  () => {
    return (
        <div className={classes.box} > 
        </div>
    )
}