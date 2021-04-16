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
    // const ObjToJSON = JSON.stringify(searchObj);
    // console.log(ObjToJSON);

    const [currentSong, setCurrentSong] = useState<any>(null);
    const [test, setTest] = useState<any>('null');

    useEffect(() => {
        // setCurrentSong(searchObj?.tracks?.items[0]);
        setCurrentSong(JSON.stringify(searchObj));
    }, []);

    return (
        <p>
            "woof" - Albert Einstein
            {currentSong !== null && currentSong !== undefined ? (
                <div>
                    Favorite song: {currentSong.name}
                    Artists:{' '}
                    {currentSong.artists.map((artist: any) => (
                        <span>{artist}</span>
                    ))}
                </div>
            ) : null}
        </p>
    );
};

export default ProfileTextField;
