import React from 'react';

interface Props {
    source: string;
}
const ProfilePicture: React.FC<Props> = ({ source }) => {
    return < img src={source} alt="Profile picture"></img>;
};

export default ProfilePicture;
