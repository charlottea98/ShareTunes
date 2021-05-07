import React, { useState } from 'react';
import { SpotifyAPI } from '../../../utility/spotifyCommunication';
import { Song, Post} from '../../../utility/types';
import PublishPageView from './PublishPageView';
import { useHistory } from 'react-router';
import firestore from '../../../firestore';
import firebase from 'firebase/app';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { DatabaseHandler } from '../../../utility/databaseHandler';



const PublishPagePresenter = () => {
    const loggedInUser = useLoggedInUser();
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [songPostInfo, setPostSongInfo] = useState<Song | undefined>(undefined);
    const [searchInput, setSearchInput] = useState<string>(' ');
    const [pictureURLInput, setPictureURLInput] = useState<string>('');
    const [captionInput, setCaptionInput] = useState<string>('');
    const [ratingInput, setRatingInput] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [tagsInput, setTagsInput] = useState<string>('');
    const [tagsArray, setTagsArray] = useState<String[]>([]);
    const [artist, setArtist] = useState<string>('');
    const history = useHistory();

    const switchSearchMode = () => {
        setIsSearching(!isSearching);
        if (isSearching){
            setPostSongInfo(undefined);
        }
    }

    const searchSong = (searchString:string) => {
        SpotifyAPI.getSongSearch(searchString).then(songInfo=>{
            let song=songInfo?.tracks?.items[0];
            if (song===undefined){
                handleChange('Please type a song', 'error');
            }
            else{
                setErrorMessage('');
                let postSong = {
                    id: song.id,
                    title: song.name,
                    artists: [{id:song.artists[0].id, name:song.artists[0].name}],
                    albumCoverURL: song.album.images[0].url,
                    previewURL: song.preview_url
                }
                setPostSongInfo( {
                    id: postSong.id,
                    title: postSong.title,
                    artists: postSong.artists,
                    albumCoverURL: postSong.albumCoverURL,
                    previewURL: postSong.previewURL,
                })

                SpotifyAPI.getArtistDetails(postSong.artists[0].id).then((artistInfo)=>{
                    let artistName = artistInfo.name;
                    setArtist(artistName)
                })
                switchSearchMode();
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
        if (tagsInput.replace(' ', '')===''){
            setErrorMessage('Tag can`t be empty');
        }
        else{
            setTagsArray(oldArray => [...oldArray, tagsInput]);
        }
    }

    const handleSubmit = (image:string, caption:string, song:Song, rating:number, tags:string[]) => {
        var errors = [];
        if (image===''){
            errors.push('picture URL');
        }
        if (caption===''){
            errors.push('caption');
        }
        if (song===undefined){
            errors.push('song');
        }
        if (rating===0 || rating === undefined){
            errors.push('rating');
        }
        if (errors.length===0){
            handlePublish(image, caption, song, rating, tags);
            setErrorMessage('Published! You will soon be redirected to your home page')
            setTimeout(()=>history.push('/home'), 5000);
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

    const handlePublish = (image:string, caption:string, song:Song, rating:number, tags:string[]) => {
        let newPost : Post = {
            caption: caption,
            comments: [],
            date: firebase.firestore.FieldValue.serverTimestamp(),
            deleted: false,
            id: '',
            likes: [],
            postImageURL: image,
            profilePictureOfPublisher: String(loggedInUser?.profilePictureURL),
            emailOfPublisher: String(loggedInUser?.email),
            rating: rating,
            song: song,
            tags: tags,
            usernameOfPublisher: String(loggedInUser?.username)
        }

        DatabaseHandler.addNewPost(newPost);
        DatabaseHandler.addNewSong(song.id);

        firestore.collection('posts').add({
            caption: caption,
            comments: [],
            date: firebase.firestore.FieldValue.serverTimestamp(),
            deleted: false,
            id: null,
            likes: 0,
            postImageURL: image,
            profilePictureOfPublisher: loggedInUser?.profilePictureURL,
            postedBy: loggedInUser?.email,
            rating: rating,
            song: song,
            tags: tags,
            usernameOfPublisher: loggedInUser?.username
        }).then((docRef) => {
            firestore.collection('posts').doc(docRef.id).update({
                id: docRef.id
            }).then(() => {
                var ref = docRef.id;
                console.log('Added and updated!')
                firestore.collection('songs').doc(song.id).get()
                .then((docSnapshot) => {
                    if(docSnapshot.exists){
                        firestore.collection('songs').doc(song.id).update({
                            ratings: firebase.firestore.FieldValue.arrayUnion(rating),
                            posts: firebase.firestore.FieldValue.arrayUnion(ref),
                            totalPosts: firebase.firestore.FieldValue.increment(1)
                        }).then(()=>{
                            console.log('Song updated')
                        })
                    }
                    else{
                        firestore.collection('songs').doc(song.id).set({
                            id: song.id,
                            title: song.title,
                            artists: song.artists,
                            albumCoverURL: song.albumCoverURL,
                            previewURL: song.previewURL,
                        }).then(()=> {
                            console.log('song added')
                        })
                    }
                }).then(()=> {
                    firestore.collection('users').doc(loggedInUser?.email).update({
                        posts: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                    })
                })
            })
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    const handleCancel = () => {
        setErrorMessage('Cancelled! You will soon be redirected to your home page')
        setTimeout(()=>history.push('/home'), 5000);
    }

    return <PublishPageView isSearching={isSearching} 
                            switchSearchMode={switchSearchMode}
                            searchSong={searchSong}
                            songPostInfo={songPostInfo}
                            artist={artist}
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
                            />
}

export default PublishPagePresenter;