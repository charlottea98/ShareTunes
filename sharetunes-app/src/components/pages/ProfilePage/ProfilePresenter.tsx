import React from 'react';
import ProfileView from '../../UserProfile/views/ProfileView';

interface Props {
    userObj: any;
}

const ProfilePresenter: React.FC<Props> = ({ userObj }) => {
    React.useEffect(
        () => {
            //effect
            return () => {
                //cleanup
            };
        },
        [
            /**input */
        ]
    );

    return (
        <ProfileView
            imgSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ivHy7rpHL0GyEA_mdcY5AAHaFj%26pid%3DApi&f=1"
            firstName={userObj.firstName}
            lastName={userObj.lastName}
            email={userObj.email}
        />
    );
};

export default ProfilePresenter;
