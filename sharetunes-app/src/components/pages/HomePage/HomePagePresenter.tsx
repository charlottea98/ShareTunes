import React, { useEffect, useState } from 'react';

import HomePageView from './HomePageView';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { Post } from '../../../utility/types';
import { useCurrentAudio } from '../../../contexts/AudioContext';

const HomePagePresenter: React.FC = () => {
    const { posts, following, users } = useDatabase();
    const loggedInUser = useLoggedInUser();
    const [postsToShow, setPostsToShow] = useState<Array<Post>>([]);

    const currentAudio = useCurrentAudio();

    useEffect(() => {
        currentAudio?.pause();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            let userIsFollowing = following[loggedInUser.email].following;
            userIsFollowing = [...userIsFollowing, loggedInUser.email];
            let postsToShowIds: Array<string> = [];

            userIsFollowing.forEach((userId) => {
                let userPostsIds = users[userId].posts;
                postsToShowIds = [...postsToShowIds, ...userPostsIds];
            });

            let numberOfPosts = Object.keys(posts).length;

            if (numberOfPosts > 0) {
                let postsToShowTemp = postsToShowIds.map((postId) => {
                    return posts[postId];
                });

                postsToShowTemp = postsToShowTemp.sort((postA, postB) => {
                    if (postA.date < postB.date) {
                        return 1;
                    } else if (postA.date > postB.date) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                postsToShowTemp = postsToShowTemp.filter(
                    (post: Post) => !post.deleted
                );

                setPostsToShow(postsToShowTemp);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, posts]);

    return <HomePageView postsToShow={postsToShow} />;
};

export default HomePagePresenter;
