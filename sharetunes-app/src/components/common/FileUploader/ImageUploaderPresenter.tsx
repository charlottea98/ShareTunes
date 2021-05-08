import React, { useState } from 'react';
import { DatabaseHandler } from '../../../utility/databaseHandler';
import ImageUploaderView from './ImageUploaderView';

interface Props {
    onFileChange: (imageURL: string) => void,
    imageCategory: "users" | "posts",
    height?: string
}

const ImageUploaderPresenter: React.FC<Props> = ({onFileChange, imageCategory, height="172px"}) => {
	const [selectedImageURL, setSelectedImageURL] = useState<string>("");

    const fileChangeHandler = async (event: any) => {
        let imageURL = await DatabaseHandler.uploadImage(event.target.files[0], imageCategory);
        onFileChange(String(imageURL));
        setSelectedImageURL(String(imageURL));
	};

    const clearUploadedImage = () => {
        setSelectedImageURL('');
        setSelectedImageURL('');
    }

    return <ImageUploaderView 
        fileChangeHandler = {fileChangeHandler}
        selectedImageURL = {selectedImageURL}
        clearUploadedImage = {clearUploadedImage}
        height = {height}
    />;
}

export default ImageUploaderPresenter;