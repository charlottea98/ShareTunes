import * as React from 'react';

import classes from "./progressLoader.module.scss"
import { faMusic} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    height: number,
    percent:number
}

export var ProgressLoader : React.FC<Props> =  ({height, percent}) => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      setValue(percent * height);
    });

    return (
        <FontAwesomeIcon icon={faMusic} className={classes.progressDiv} style={{height: height}}></FontAwesomeIcon>
    )
}