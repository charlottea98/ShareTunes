import React from 'react';
import classes from './fileUploaderInspo.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
    onChange: (file: File | null) => void
}

const FileUploaderInspo: React.FC<Props> = ({onChange}) => {
    const [file, setFile] = useState<any>('');
    const [previewUrl, setPreviewUrl] = useState<any>('');

    const _handleImageChange = (e: any) => {
        e.preventDefault()

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setFile(file);
            setPreviewUrl(reader.result);
            onChange(file)
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const _clearImage = () => {
        setFile('');
        setPreviewUrl('');
        onChange(null);
    };

    return (
        <div className={classes.FileUploaderInspo}>
            <div
                className={classes.uploaderContainer}
                style={{ backgroundImage: `url('${previewUrl}')` }}
            >
            {file ? (
            <div className={classes.cancelUpload}>
                <label htmlFor='file-upload'></label>
                <span>
                    <FontAwesomeIcon
                        size='2x'
                        icon={faTimes}
                        color='#fec46e'
                        onClick={_clearImage}
                    />
                </span>
            </div>
            ) : (
            <label htmlFor='file-upload'>
                <FontAwesomeIcon size='3x' icon={faPlus} color='#fec46e' />
            </label>
            )}
        </div>
        <input
            id='file-upload'
            type='file'
            onChange={_handleImageChange}
        />
        </div>
    );
};

export default FileUploaderInspo;