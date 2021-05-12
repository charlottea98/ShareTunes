import classes from './fileUploader.module.scss';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
    fileChangeHandler: (event: any) => void,
    clearUploadedImage: () => void,
    selectedImageURL: string,
    height: string
}

const ImageUploaderView: React.FC<Props> = ({
    fileChangeHandler,
    clearUploadedImage,
    selectedImageURL,
    height
}) => {
    const [backgroundColor, setBackgroundColor] = useState<string>("#fff");
    const iconToDisplay = selectedImageURL === "" ? (
        <div className={classes.uploadIcon}><FontAwesomeIcon icon={faPlus} size="3x" color="#fec46e" /></div>
    ): (
        <div 
            className={classes.deleteCurrentImageIcon}
            onClick = {clearUploadedImage}
        ><FontAwesomeIcon icon={faTimes} /></div>
    )

    return (
        <div 
            className={classes.FileUploader}
            style={{ 
                backgroundImage: `url('${selectedImageURL}')` ,
                height: height,
                backgroundColor: backgroundColor
            }}
            onDragOver = {e => e.preventDefault()}
            onDragEnter = {() => setBackgroundColor("#fff4e3")}
            onDragLeave = {() => setBackgroundColor("#fff")}
        >
            <input type="file" name="file" onChange={e => {
                fileChangeHandler(e);
                setBackgroundColor("#fff");
            }} />
            { iconToDisplay }
        </div>
    )
}

export default ImageUploaderView;