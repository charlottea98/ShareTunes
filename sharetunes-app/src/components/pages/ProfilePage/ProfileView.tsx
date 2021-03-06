import React from 'react';
import classes from './profileView.module.scss';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import FollowButton from '../../common/buttons/FollowButton/PrimaryButton';
import SongCardPresenter from '../../common/SongCard/SongCardPresenter';
import ProfilePostsPresenter from './ProfilePostsPresenter';

import { DEFAULT_PROFILE_PICTURE_URL } from '../../../utility/utility';

interface Props {
    ownProfile: boolean;
    user: any;
    onClickButton: any;
    numberOfposts: any;
    followers: number;
    following: number;
    isFollowing: Function;
}

const ProfileView: React.FC<Props> = ({
    ownProfile,
    user,
    onClickButton,
    numberOfposts,
    followers,
    following,
    isFollowing,
}) => {
    return (
        <div className={classes.ProfileViewContainer}>
            <div className={classes.ProfileView}>
                <div className={classes.profileInfoContainer}>
                    <img
                        className={classes.ProfileImg}
                        src={
                            user.profilePictureURL
                                ? user.profilePictureURL
                                : DEFAULT_PROFILE_PICTURE_URL
                        }
                        alt="Profile"
                    />

                    <div className={classes.profileInfo}>
                        <div className={classes.NameButtonContainer}>
                            <h2 className={classes.Name}>{user.username}</h2>

                            <div className={classes.Button}>
                                {ownProfile ? (
                                    <PrimaryButton
                                        text="Edit profile"
                                        onButtonClick={onClickButton}
                                        buttonColor="editProfileBtn"
                                    />
                                ) : isFollowing() ? (
                                    <FollowButton
                                        text="Unfollow"
                                        onButtonClick={onClickButton}
                                        buttonColor="followBtn"
                                    />
                                ) : (
                                    <FollowButton
                                        text="Follow"
                                        onButtonClick={onClickButton}
                                        buttonColor="followBtn"
                                    />
                                )}
                            </div>
                        </div>

                        <ul className={classes.List}>
                            <li>
                                <b>{numberOfposts}</b> posts
                            </li>
                            <li>
                                <b>{followers}</b> followers
                            </li>
                            <li>
                                <b>{following}</b> following
                            </li>
                        </ul>

                        <div className={classes.Song}>
                            {user.favoriteSong ? (
                                <SongCardPresenter songId={user.favoriteSong} />
                            ) : null}
                        </div>

                        <div className={classes.About}>
                            <h3>{user.name}</h3>

                            <p>{user.biography}</p>
                        </div>
                    </div>
                </div>

                <ProfilePostsPresenter />
            </div>
        </div>
    );
};

export default ProfileView;
