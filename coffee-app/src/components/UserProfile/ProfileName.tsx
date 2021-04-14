import React from 'react';

interface Props {
    name: String;
}

const ProfileName: React.FC<Props> = ({ name }) => {
    return <h1>{name}</h1>;
};

export default ProfileName;
