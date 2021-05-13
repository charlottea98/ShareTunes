import React, { useState } from 'react';
import { SpotifyAPI } from '../../../utility/spotifyHandler';
import { Post} from '../../../utility/types';
import PublishPageView from './PublishPageView';
import { useHistory } from 'react-router';
import firebase from 'firebase/app';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { DatabaseHandler } from '../../../utility/databaseHandler';


const PublishPagePresenter: React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [songPostId, setPostSongId] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>(' ');
    const [pictureURLInput, setPictureURLInput] = useState<string>('');
    const [captionInput, setCaptionInput] = useState<string>('');
    const [ratingInput, setRatingInput] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [tagsInput, setTagsInput] = useState<string>('');
    const [tagsArray, setTagsArray] = useState<Array<string>>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [typing, setTyping] = useState<boolean>(false);
    const history = useHistory();

    const switchSearchMode = () => {
        setIsSearching(!isSearching);
        if (isSearching){
            setPostSongId('');
            setSearchResults([]);
        }
    }

    const searchSong = (id:string) => {
        if (id===undefined){
            handleChange('Please type a song', 'error');
        }
        else{
            setErrorMessage('');
            setPostSongId(id);
            switchSearchMode();
            DatabaseHandler.addNewSong(id);
            setSearchInput('');
        }  
    }

    const handleTypeSearch = (value:string) => {
        setSearchResults([]);
        SpotifyAPI.getSongSearch(value).then(songInfo=>{
            let songs = songInfo?.tracks?.items;
            if (songs!==undefined){
                songs = songs.map((song:any) => {
                    return {id: song.id, title: song.name, albumImage: song.album.images[2].url};
                })
                setSearchResults(songs);
            }
        })
    }

    const handleChange = (e:any, type:string) => {
        if (type==='rating'){
            setRatingInput(e);
        }
        else if (type==='error'){
            setErrorMessage(e);
        }
        else{
            var value = e.target.value;
            if (type==='song'){
                setSearchInput(value);
                setTyping(true);
                handleTypeSearch(value);
            }
            if (type==='caption'){
                setCaptionInput(value);
            }
            if(type==='image'){
                setPictureURLInput(value);
            }
            if(type==='tags'){
                setTagsInput(value);
            }
        }   
    }

    const addToTags = () => {
        if (tagsInput.replace(' ', '') === ''){
            setErrorMessage('Tag can`t be empty');
        }
        else{
            setTagsArray(oldArray => [...oldArray, tagsInput]);
            setTagsInput("");
        }
    }

    const deleteTag = (tagToDelete: string) => {
        let newTags = [...tagsArray];
        newTags = newTags.filter(tag => tag !== tagToDelete);
        
        setTagsArray(newTags);
    }

    const handleSubmit = (image:string, caption:string, songId:string, rating:number, tags:string[]) => {
        var errors = [];
        if (image===''){
            errors.push('picture ');
        }
        if (caption===''){
            errors.push('caption');
        }
        if (songId===''){
            errors.push('song');
        }
        if (rating===0 || rating === undefined){
            errors.push('rating');
        }
        if (errors.length===0){
            handlePublish(image, caption, songId, rating, tags);
            setErrorMessage('Published!')
            setTimeout(()=>history.push('/home'), 2000);
        }
        else if (errors.length===1){
            var errormessage = 'Missing field: ';
            errormessage += errors[errors.length-1] + '.'
            setErrorMessage(errormessage);
        }
        else {
            var errormessage = 'Missing fields: ';
            for (let i=0; i < errors.length-1; i++){
                errormessage += errors[i] + ', ';
            }
            errormessage += 'and ' + errors[errors.length-1] + '.'
            setErrorMessage(errormessage);
        }
    }

    const handlePublish = (image:string, caption:string, songId:string, rating:number, tags:string[]) => {
        let newPost = {
            caption: caption,
            comments: [],
            date: firebase.firestore.FieldValue.serverTimestamp(),
            deleted: false,
            id: '',
            likes: [],
            postImageURL: image,
            publisherId: String(loggedInUser?.email),
            rating: rating,
            songId: songId,
            tags: tags,
        }

        DatabaseHandler.addNewPost(newPost);
        DatabaseHandler.addNewSong(songId);
    }

    const handleCancel = () => {
        setErrorMessage('Cancelled!')
        setTimeout(() => history.push('/home'), 2000);
    }

    const handlePostPictureChange = (imageURL: string) => {
        setPictureURLInput(imageURL);
    }

    const handleClose = () => {
        setTyping(false);
        setSearchResults([]);
    }

    return <PublishPageView 
        isSearching={isSearching} 
        switchSearchMode={switchSearchMode}
        searchSong={searchSong}
        songPostId={songPostId}
        handleChange={handleChange}
        searchInput={searchInput}
        captionInput={captionInput}
        tagsArray={tagsArray}
        imageURL={pictureURLInput}
        ratingInput={ratingInput}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        handleCancel={handleCancel}
        addToTags={addToTags}
        tagsInput={tagsInput}
        handlePostPictureChange = {handlePostPictureChange}
        deleteTag = {deleteTag}
        searchResults={searchResults}
        typing={typing} 
        handleClose={handleClose}
    />;
}

export default PublishPagePresenter;