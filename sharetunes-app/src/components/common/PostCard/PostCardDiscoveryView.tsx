import React from 'react';
import { PostCardInfo } from '../../../utility/types';
import classes from './postCard.module.scss';

interface Props {
    postCardInfo: PostCardInfo | undefined
}

const PostCardDiscoveryView : React.FC<Props> = ({postCardInfo}) => {
    return (
        <div className={classes.PostCardDiscovery}>
            Discovery Post Card
        </div>
    )
}

export default PostCardDiscoveryView;