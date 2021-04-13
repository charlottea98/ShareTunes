import React, { useState } from 'react';
import ProfileName from './ProfileName';
import ProfilePicture from './ProfilePicture';
import ProfileTitles from './ProfileTitles';
import ProfileTextField from './ProfileTextField';

import classes from './userProfile.module.scss';

interface Props {}

const UserProfile: React.FC<Props> = (props) => {
    return (
        <div>
            <ProfileName name={'John Dog'} />
            <ProfilePicture
                source={
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ivHy7rpHL0GyEA_mdcY5AAHaFj%26pid%3DApi&f=1'
                }
            />
            <ProfileTitles title={'About'} />
            <ProfileTextField />
            <ProfileTitles title={'Interests'} />
            <ProfileTextField />
            <ProfileTitles title={'Favorite Coffee'} />
            <ProfileTextField />
            <ProfileTitles title={'Gangster Puppy'} />
            <ProfileTextField />
            <ProfileTitles title={'Party Puppy'} />
            <ProfileTextField />
        </div>
    );
};

export default UserProfile;
