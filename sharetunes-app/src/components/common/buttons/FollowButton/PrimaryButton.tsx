import React from 'react';

import classes from './primaryButton.module.scss';

interface Props {
    text: String;
    onButtonClick: () => void;
    buttonColor?: 'black' | 'blue' | 'green' | 'editProfileBtn' | 'followBtn';
}

const PrimaryButton: React.FC<Props> = ({
    text,
    onButtonClick,
    buttonColor,
}) => {
    let buttonStyle;

    if (buttonColor === undefined) {
        buttonStyle = classes.standardStyle;
    } else if (buttonColor === 'black') {
        buttonStyle = classes.blackStyle;
    } else if (buttonColor === 'green') {
        buttonStyle = classes.greenStyle;
    } else if (buttonColor === 'editProfileBtn') {
        buttonStyle = classes.editProfileBtn;
    } else if (buttonColor === 'followBtn') {
        buttonStyle = classes.followBtn;
    }

    return (
        <div
            onClick={onButtonClick}
            className={[buttonStyle, classes.PrimaryButton].join(' ')}
        >
            {text}
        </div>
    );
};

export default PrimaryButton;
