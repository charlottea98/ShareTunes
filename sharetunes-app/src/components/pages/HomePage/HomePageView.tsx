import React from 'react';
import { Post } from '../../../utility/types';
import classes from './homePage.module.scss';

import PostCard from '../../common/PostCard/PostCardPresenter';
import ImageUploader from '../../common/FileUploader/ImageUploaderPresenter';
import FileUploaderInspo from '../../common/FileUploader/FileUploaderInspo';

interface Props {
    postsToShow: Array<Post>
}

const HomePageView : React.FC<Props> = ({postsToShow}) => {
    return (
        <div className={classes.HomePage}>
            {/* <ImageUploader imageCategory="users" /> */}
            {/* <div style={{"width": "300px"}}>
                <FileUploaderInspo onChange={(file) => console.log(file)} />
            </div>   */}
            
            {
                postsToShow.map((post, idx) => (
                    <div className={classes.postCardContainer} key = {idx}>
                        <PostCard
                            postInfo = {post}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default HomePageView;