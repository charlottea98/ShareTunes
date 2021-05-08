import classes from './fileUploader.module.scss';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
    fileChangeHandler: (event: any) => void,
    clearUploadedImage: () => void,
    selectedImageURL: string
}

const ImageUploaderView: React.FC<Props> = ({
    fileChangeHandler,
    clearUploadedImage,
    selectedImageURL
}) => {

    console.log(selectedImageURL);
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
            style={{ backgroundImage: `url('${selectedImageURL}')` }}
        >
            <input type="file" name="file" onChange={fileChangeHandler} />
            { iconToDisplay }
        </div>
    )
}

export default ImageUploaderView;