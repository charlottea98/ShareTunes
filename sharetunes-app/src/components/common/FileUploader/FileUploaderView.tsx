import React from 'react';

interface Props {
    fileChangeHandler: (event: any) => void,
    handleFileSubmission: () => void,
    percentageLoaded: number
}

const FileUploaderView: React.FC<Props> = ({
    fileChangeHandler,
    handleFileSubmission,
    percentageLoaded
}) => {
    return (
        <div>
            <progress value={percentageLoaded} max="100">{percentageLoaded}%</progress>
            <input type="file" name="file" onChange={fileChangeHandler} />
			<div>
				<button onClick={handleFileSubmission}>Submit</button>
			</div>
        </div>
    )
}

export default FileUploaderView;