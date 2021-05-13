import React, { useState } from 'react';
import { DatabaseHandler } from '../../../utility/databaseHandler';
import FullscreenMessageToUserView from '../FullscreenMessageToUser/FullscreenMessageToUserView';
import ImageUploaderView from './ImageUploaderView';

interface Props {
    onFileChange: (imageURL: string) => void,
    imageCategory: "users" | "posts",
    height?: string,
    maxSizeInKB?: number
}

const ImageUploaderPresenter: React.FC<Props> = ({onFileChange, imageCategory, height="172px", maxSizeInKB=1024}) => {
	const [selectedImageURL, setSelectedImageURL] = useState<string>("");
    const [showToBigFileModal, setShowToBigFileModal] = useState<boolean>(false);
    const [currentFileSize, setCurrentFileSize] = useState<string>("");

    const fileChangeHandler = async (event: any) => {
        let imageFile = event.target.files[0];

        if (imageFile) {
            let fileSizeInKB = imageFile.size / 1000;

            if (fileSizeInKB > maxSizeInKB) {
                let roundedFileSize = String(Math.round(fileSizeInKB));
                setCurrentFileSize(roundedFileSize);
                setShowToBigFileModal(true);
            } else {
                let imageURL = await DatabaseHandler.uploadImage(imageFile, imageCategory);
                imageURL = String(imageURL);
                onFileChange(imageURL);
                setSelectedImageURL(imageURL);
            }
        }
	};

    const clearUploadedImage = () => {
        setSelectedImageURL('');
        setSelectedImageURL('');
    }

    return (
        <>
            <ImageUploaderView 
                fileChangeHandler = {fileChangeHandler}
                selectedImageURL = {selectedImageURL}
                clearUploadedImage = {clearUploadedImage}
                height = {height}
            />

            {
                showToBigFileModal ? 
                    <FullscreenMessageToUserView 
                        bigTextMessage = "The selected image is too big"
                        smallTextMessage = {{
                            text: `Your file is ${currentFileSize} kB, while the limit is ${maxSizeInKB} kB.`,
                            styling: {
                                "fontWeight": 500, 
                                "fontSize": "15px", 
                                "margin": "5px 0"
                            }
                        }}
                        abortButtonOnClick = {() => setShowToBigFileModal(false)}
                        button1 = {{
                            onClick: () => setShowToBigFileModal(false),
                            color: 'gray',
                            text: 'OK'
                        }}
                    /> : null
            }
            
        </>

    )
}

export default ImageUploaderPresenter;