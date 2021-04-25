import React from 'react';

interface Props {
    title: String;
}
const ProfileTitles: React.FC<Props> = ({ title }) => {
    return <h2>{title}</h2>;
};

export default ProfileTitles;
