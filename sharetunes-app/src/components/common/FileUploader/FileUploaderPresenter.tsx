import React, { useState } from 'react';
import { DatabaseHandler } from '../../../utility/databaseHandler';
import FileUploaderView from './FileUploaderView';
import firebase from 'firebase';

const storage = firebase.storage();


interface Props {

}

const FileUploaderPresenter: React.FC<Props> = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
	const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
    const [percentageLoaded, setPercentageLoaded] = useState<number>(0);

    const fileChangeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleFileSubmission = () => {
        if (isFilePicked && selectedFile !== null) {
            let fileType = String(selectedFile.type).slice(6);
            let fileName = `${String(Date.now())}.${fileType}`;
            let storageRef = storage.ref(`images/users/${fileName}`);
            let uploadTask = storageRef.put(selectedFile);
    
            uploadTask.on('state_changed', 
                snapshot => {
                    setPercentageLoaded((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                }, error => {
    
                }, () => {
                    setPercentageLoaded(0);
                }
            )
        }
	};

    
    return <FileUploaderView 
        fileChangeHandler = {fileChangeHandler}
        handleFileSubmission = {handleFileSubmission}
        percentageLoaded = {percentageLoaded}
    />;
}

export default FileUploaderPresenter;