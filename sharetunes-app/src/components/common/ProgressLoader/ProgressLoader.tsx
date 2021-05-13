import * as React from 'react';

import classes from "./progressLoader.module.scss"
import { faMusic} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {

}

export var ProgressLoader : React.FC<Props> =  () => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      setValue(0);
    });

    return (
        <div className={classes.box} > 
        </div>
    )
}