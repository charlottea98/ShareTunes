import React from 'react';
import classes from './publishPage.module.scss';
import { faPlusCircle, faMusic, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SongCardPresenter from '../../common/SongCard/SongCardPresenter';
import ImageUploaderPresenter from '../../common/FileUploader/ImageUploaderPresenter';

interface Props {
    isSearching: any,
    switchSearchMode: Function,
    searchSong: Function,
    songPostId: string,
    handleChange: Function,
    captionInput:any,
    tagsArray:Array<string>,
    imageURL:any,
    ratingInput:any,
    handleSubmit:Function,
    handleCancel:Function,
    addToTags: Function,
    tagsInput: string,
    handlePostPictureChange: (imageURL: string) => void,
    deleteTag: (tagToDelete: string) => void
    searchResults:any[],
    typing: boolean,
    handleClose: Function,
    errors: string[]
}

const PublishPageView : React.FC<Props> = ({
    isSearching, 
    switchSearchMode, 
    searchSong, 
    songPostId, 
    handleChange, 
    captionInput, 
    tagsArray,
    imageURL, 
    ratingInput, 
    handleSubmit,
    handleCancel, 
    addToTags,
    tagsInput,
    handlePostPictureChange,
    deleteTag,
    searchResults,
    typing,
    handleClose,
    errors
}) => {
    const ratings = [1, 2, 3, 4, 5];

    const isSearchingElements = (
        <div className={classes.showSong}>
            <SongCardPresenter songId = {songPostId} />
            <div className={classes.songButton} onClick={()=>switchSearchMode()}>Change song</div>
        </div>
    );

    const isNotSearchingElements = typing ? (
        <div 
            className={classes.outsideContainer} 
            onClick={() => handleClose()}
        />
    ) : null;


    const isTypingElements = typing ? (
        <div className={classes.SearchResultsList}>
            {searchResults.map((result, idx) => (
                <div 
                    className={classes.SearchListItems} 
                    onClick={() => {
                        searchSong(result.id);
                        handleClose();
                    }}
                    key = {idx}
                >
                    <img src={result.albumImage} className={classes.SearchItemImage} />
                    <FontAwesomeIcon icon={faMusic} />
                    <div className={classes.SearchItemTitle}>
                        {result.title}
                    </div>
                </div>
            ))}
        </div>
    ) : null;

    const songComponent = (
        <div className={classes.songComponent}>
            <div className={classes.headers}>Song</div>
            {isSearching ? isSearchingElements : isNotSearchingElements}

            {
                songPostId === "" ? (
                    <input 
                        className={classes.input} 
                        onChange={e => handleChange(e, 'song')} 
                        onClick={e => handleChange(e, 'song')}
                    />
                ) : null
            }
            
            {isTypingElements}
        </div>
    );

    return (
        <div className={classes.mainDiv}>
            <div className={classes.title}>
                Create post
            </div>
            <div className={classes.postBox}>
                <div className={classes.postImage}>
                    <div 
                        className={classes.headers}
                        style = {{
                            marginTop: 0
                        }}
                    >Post picture</div>
                    <ImageUploaderPresenter onFileChange={handlePostPictureChange} imageCategory="posts" />
                    {errors.includes('picture')? (
                        <div className = {classes.errorText}>
                            You have to add an image
                        </div>
                    ):
                    (
                        null
                    )}
                </div>
                <div className={classes.postCaption}>
                    <div className={classes.headers}>Caption</div>
                    <input className={classes.input} onChange={e => {handleChange(e,'caption');}}/>
                    {errors.includes('caption')? (
                        <div className = {classes.errorText}>
                            You have to write a caption
                        </div>
                    ):
                    (
                        null
                    )}
                </div>
                <div className={classes.headers}>Tags</div>
                <div className={classes.postSong}>
                    <div className={classes.addTags}>
                        <input 
                            type = "text" 
                            className = {classes.input}
                            onChange = {e => handleChange(e,'tags')}
                            value = {tagsInput}
                            onKeyDown = {e => {
                                if (e.key === "Enter") {
                                    addToTags();
                                }
                            }}
                        />
                        <div className={classes.addTagIcon} onClick={() => addToTags()}>
                            <FontAwesomeIcon icon={faPlusCircle} cursor='pointer' size='1x' />
                        </div>
                    </div>
                    <div className={classes.tagsContainer}>
                        {tagsArray.map((tag, idx) => (
                            <div className={classes.tag} key={idx}>
                                {tag}
                                <div 
                                    className={classes.deleteTag}
                                    onClick={() => deleteTag(tag)}
                                >
                                    <FontAwesomeIcon icon={faTimes}  cursor='pointer' size='1x' />
                                </div>
                            </div>
                        ))}
                    </div>
                    {errors.includes('tags')? (
                        <div className = {classes.errorText}>
                            Tag can`t be empty
                        </div>
                    ):
                    (
                        null
                    )}
                </div>
                
                {songComponent}
                {errors.includes('song')? (
                        <div className = {classes.errorText}>
                            You have to choose a song
                        </div>
                    ):
                    (
                        null
                    )}

                <div className={classes.headers}>Rating</div>
                <div>
                <div className={classes.postRatings}>
                    {ratings.map((rating, idx) => (
                        <div 
                            key = {idx}
                            className={classes.ratingsButton}
                            tabIndex={rating}
                            onClick={() => handleChange(rating, 'rating')}
                            style = {ratingInput === rating ? {
                                backgroundColor: "#fec46e",
                                color: "#fff",
                                fontWeight: 700
                            } : {}}
                        >{rating}</div>
                    )
                    )}
                </div>
                {errors.includes('rating')? (
                        <div className = {classes.errorText}>
                            You have to add a rating
                        </div>
                    ):
                    (
                        null
                    )}
                </div>
                <div className={classes.postPublish}>
                    <div className={classes.cancelButton} onClick={()=>handleCancel()}>Cancel</div>
                    <div 
                        className={classes.publishButton} 
                        onClick={()=>handleSubmit(imageURL, captionInput, songPostId, ratingInput, tagsArray)}
                    >Publish</div>
                </div>
            </div>
        </div>
    );
}

export default PublishPageView;