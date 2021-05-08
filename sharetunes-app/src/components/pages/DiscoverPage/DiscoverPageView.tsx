import React from 'react';
import SearchBar from './SearchbarPresenter';
import classes from './discoverPage.module.scss';
import PostCardPresenter from '../../common/PostCard/PostCardPresenter';
import SongCardPresenter from '../../common/SongCard/SongCardPresenter';

interface Props {
    user: any,
    posts: any[],
    topSongs: any[],
    recommendedSongs:any[]
}

const DiscoverPageView:React.FC<Props> = ({user, posts, topSongs, recommendedSongs}) => {
    return (
        <div>
            <div className={classes.SearchBar}>
            <SearchBar />
            </div>
            <div className={classes.discoverPage}>
            <div className={classes.discoverFeed}>
            {posts.map((post, idx) => (
                <div className={classes.card} key={idx}>
                    <PostCardPresenter postInfo={post} />
                </div>
            ))}
            </div>
            <div className={classes.discoverSidebar}>
                <div className={classes.popularSongs}>
                    <div className={classes.sideBarText}>
                        Popular Songs
                    </div>
                    <div className={classes.displayPopular}>
                        {topSongs.map((songId, idx) => (
                            <div className={classes.songCard} key={idx}>
                                <SongCardPresenter songId={songId} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.recommendedSongs}>
                    <div className={classes.sideBarText}>
                        Recommended Songs
                    </div>
                    <div className={classes.displayRecommended}>
                    {recommendedSongs.map((songId, idx) => (
                        <div className={classes.songCard} key={idx}>
                            <SongCardPresenter songId={songId} />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DiscoverPageView;
