import React, { useEffect, useState } from 'react';
import classes from './pageNotFound.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faFrown as farFaFrown } from '@fortawesome/free-regular-svg-icons';

const PageNotFoundView: React.FC = () => {
    const [renderContent, setRenderContent] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => { 
            setRenderContent(true);
        }, 500)
    })

    const pageNotFoundElements = (
        <div>
                <h1 style = {{
                    "fontWeight": 300,
                    "fontStyle": "italic",
                    "marginBottom": "30px"
                }}>Oh no!</h1>

                <div>
                    Page not found!
                    <FontAwesomeIcon icon={farFaFrown} color="#FEC46E" size="2x" />
                </div>
            </div>
    );

    return (
        <div className={classes.PageNotFound}>
            {renderContent ? pageNotFoundElements : null}
        </div>
    )
}

export default PageNotFoundView;