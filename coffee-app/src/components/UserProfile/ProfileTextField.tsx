import React, { useState, useEffect } from 'react';

interface SpotifyTestSong {
    title: string;
    artists: Array<string>;
    url: string;
}

interface Props {
    searchObj?: any;
}
const ProfileTextField: React.FC<Props> = ({ searchObj }) => {
    useEffect(() => {}, []);

    return <p>{JSON.stringify(searchObj?.tracks?.items[0].name)}</p>;
};

export default ProfileTextField;
