import React from 'react';
import classes from './publishPage.module.scss';
import { faSearch, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SongCardPresenter from '../../common/SongCard/SongCardPresenter';

interface Props {
    isSearching: any,
    switchSearchMode: Function,
    searchSong: Function,
    songPostInfo: any,
    handleChange: Function,
    searchInput: any,
    captionInput:any,
    tagsArray:String[],
    imageURL:any,
    ratingInput:any,
    handleSubmit:Function,
    errorMessage:any,
    handleCancel:Function,
    addToTags: Function
}

const PublishPageView : React.FC<Props> = ({isSearching, switchSearchMode, searchSong, songPostInfo, handleChange, searchInput, captionInput, tagsArray,imageURL, ratingInput, handleSubmit, errorMessage, handleCancel, addToTags}) => {
    var ratings = [1,2,3,4,5];
    return <div className={classes.mainDiv}>
        <div className={classes.title}>
            Create post
        </div>
        <div className={classes.postBox}>
            <div className={classes.postImage}>
                <div className={classes.headers}>Post picture URL</div>
                <input className={classes.input} onChange={e => {handleChange(e,'image');}}/>
            </div>
            <div className={classes.postCaption}>
                <div className={classes.headers}>Caption</div>
                <input className={classes.input} onChange={e => {handleChange(e,'caption');}}/>
            </div>
            <div className={classes.headers}>Tags</div>
            <div className={classes.postSong}>
                <input type="text" className={classes.input} onChange={e => {handleChange(e,'tags');}}/>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={faPlusCircle} onClick={()=>{addToTags()}} cursor='pointer' size='1x'></FontAwesomeIcon>
                </div>
                <div className={classes.tagsContainer}>
                    {tagsArray.map(tag => {
                        return <div className={classes.tag}>{tag}</div>
                    })}
                </div>
            </div>
            <div>
                <div className={classes.headers}>Song</div>
                {isSearching?(
                    <div className={classes.showSong}>
                        <SongCardPresenter song = {{
                            id: songPostInfo.id,
                            title: songPostInfo.title,
                            artists: [{
                                id: songPostInfo.artists[0].id,
                                name: songPostInfo.artists[0].name
                            }],
                            albumCoverURL: songPostInfo.albumCoverURL,
                            previewURL: songPostInfo.previewURL
                        }}
                        ></SongCardPresenter>
                        <div className={classes.songButton} onClick={()=>switchSearchMode()}>Change song</div>
                    </div>
                ):(
                <div className={classes.postSong}>
                <input className={classes.input} onChange={e => {handleChange(e,'song');}}/>
                <FontAwesomeIcon icon={faSearch} onClick={()=>searchSong(searchInput)} cursor='pointer' size='1x'></FontAwesomeIcon>
                </div>
                )}
            </div>
            <div className={classes.postRatings}>
                {ratings.map(rating => {
                    return <div className={classes.ratingsButton} tabIndex={rating}
                    onClick={()=>{handleChange(rating, 'rating')}}>{rating}</div>
                })}
            </div>
            <div className={classes.postPublish}>
                <div className={classes.cancelButton} onClick={()=>handleCancel()}>Cancel</div>
                <div className={classes.publishButton} onClick={()=>handleSubmit(imageURL, captionInput, songPostInfo, ratingInput, tagsArray)}>Publish</div>
            </div>
        </div>
        {
            errorMessage!==''?(
                <div className={classes.publishedInfo}>
                    {errorMessage}
                </div>
            ):(
                <div>
                </div>
            )
        }
    </div>;
}

export default PublishPageView;