import React, { useState } from 'react';
import { SpotifyAPI } from '../../../utility/spotifyCommunication';
import { Song} from '../../../utility/types';
import PublishPageView from './PublishPageView';
import { useHistory } from 'react-router';
import firestore from '../../../firestore';
import firebase from 'firebase/app';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';



const PublishPagePresenter = () => {
    const loggedInUser = useLoggedInUser();
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [songPostInfo, setPostSongInfo] = useState<Song | undefined>(undefined);
    const [searchInput, setSearchInput] = useState<String>(' ');
    const [pictureURLInput, setPictureURLInput] = useState<String>('');
    const [captionInput, setCaptionInput] = useState<String>('');
    const [ratingInput, setRatingInput] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [tagsInput, setTagsInput] = useState<string>('');
    const [tagsArray, setTagsArray] = useState<String[]>([]);
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
            console.log(song);
            if (song===undefined){
                handleChange('Please type a song', 'error');
            }
            else{
                setErrorMessage('');
                let postSong = {
                    id: song.id,
                    title: song.name,
                    artists: song.artists[0].id,
                    albumCoverSmallURL: song.album.images[2].url,
                    albumCoverMediumURL: song.album.images[1].url,
                    albumCoverLargeURL: song.album.images[0].url,
                    songPreviewURL: song.preview_url
                }
                setPostSongInfo( {
                    id: postSong.id,
                    title: postSong.title,
                    artists: postSong.artists,
                    albumCoverSmallURL: postSong.albumCoverSmallURL,
                    albumCoverMediumURL: postSong.albumCoverMediumURL,
                    albumCoverLargeURL: postSong.albumCoverLargeURL,
                    songPreviewURL: postSong.songPreviewURL,
                    posts: [],
                    totalLikes: 0,
                    totalPosts: 0,
                    avarageRating: 0
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

    const handleSubmit = (image:String, caption:String, song:Song, rating:number, tags:String[]) => {
        console.log(tags);
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
        console.log(image);
        console.log(caption);
        console.log(song);
        console.log(rating);
        console.log(tags);
        console.log(loggedInUser?.email);
    }

    const handlePublish = (image:String, caption:String, song:Song, rating:number, tags:String[]) => {
        firestore.collection('posts').add({
            caption: caption,
            comments: [],
            date: firebase.firestore.FieldValue.serverTimestamp(),
            deleted: false,
            id: null,
            likes: 0,
            postImageURL: image,
            postedBy: loggedInUser?.email,
            rating: rating,
            song: song.id,
            tags: tags
        }).then((docRef) => {
            firestore.collection('posts').doc(docRef.id).update({
                id: docRef.id
            }).then(() => {
                console.log('Added and updated!')
                firestore.collection('songs').doc(song.id).get()
                .then((docSnapshot) => {
                    if(docSnapshot.exists){
                        firestore.collection('songs').doc(song.id).update({
                            ratings: firebase.firestore.FieldValue.arrayUnion(rating),
                            posts: firebase.firestore.FieldValue.arrayUnion(docRef),
                            totalPosts: firebase.firestore.FieldValue.increment(1)
                        }).then(()=>{
                            console.log('Song updated')
                        })
                    }
                    else{
                        firestore.collection('songs').doc(song.id).set({
                            albumCoverLargeURL: song.albumCoverLargeURL,
                            albumCoverMediumURL: song.albumCoverMediumURL,
                            albumCoverSmallURL: song.albumCoverSmallURL,
                            artists: song.artists,
                            averageRating: [rating],
                            id: song.id,
                            posts: [docRef.id],
                            songPreviewURL: song.songPreviewURL,
                            title: song.title,
                            totalLikes: 0,
                            totalPosts: 1
                        }).then(()=> {
                            console.log('song added')
                        })
                    }
                }).then(()=> {
                    firestore.collection('users').doc(loggedInUser?.email).update({
                        posts: firebase.firestore.FieldValue.arrayUnion(docRef)
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