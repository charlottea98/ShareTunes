import React from 'react';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';

interface Props {
    user: any
}

const DiscoverPageView:React.FC<Props> = ({user}) => {
    return (
        <div>
            <strong>
                { user?.username } <br />
                { user?.email } <br />
                { user?.favoriteSong.title } <br />
                { user?.name }

            </strong>
            <LogoutButton/>
        </div>
    );
}

export default DiscoverPageView;