import React, { useState } from 'react';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import firestore from '../../../firestore';
import firebase from 'firebase/app';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import classes from './searchbar.module.scss';

const SearchBar = () => {
    const [searchResults, setSearchResult] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);
    const [typing, setTyping] = useState<boolean>(false);
    const loggedInUser = useLoggedInUser();

    const findUsers = (val:string) => {
        setSearchResult([]);
        getFollowing();
        firestore.collection('users').get().then(snapshot => {
            snapshot.docs.map(doc => {
                if (doc.data().userName.includes(val)){
                    setSearchResult(oldArray => [...oldArray, doc.data()]);
                }
            })
        })
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        var value = e.target.value;
        setTyping(true);
        handleSubmit(value);
    }

    const handleSubmit = (value:string) => {
        findUsers(value);
    }

    const handleClose = () => {
        setTyping(false);
        setSearchResult([]);
    }

    const getFollowing = () => {
       firestore.collection('following').doc(loggedInUser?.email).onSnapshot({includeMetadataChanges:true}, (doc) => {
        if (doc.data() !== undefined){
            setFollowing(doc.data()?.following)
        }
       });
    }

    const isFollowing = (email:string) : boolean => {
        if (following.includes(email)){
            return true;
        }
        return false;
    }

    const followUser = (user:any) => {
        firestore.collection('followers').doc(user.email).update({
            followers: firebase.firestore.FieldValue.arrayUnion(loggedInUser?.email)
        })
        firestore.collection('following').doc(loggedInUser?.email).update({
            following: firebase.firestore.FieldValue.arrayUnion(user.email)
        })
    }

    return (
            <div className={classes.SearchBar}>
            <input type="text"
                    name="name"
                    placeholder="Search users..."
                    onChange={e => {handleChange(e);}}
                    className={classes.SearchInput}>
            </input>
            <ul hidden={!typing} className={classes.SearchList}>
            <div className={classes.SearchItems}>
                <button onClick={()=>handleClose()}>Close</button>
            </div>
            {searchResults.map(result => {
                return (<div className={classes.SearchItems}>
                    {result.userName}<button disabled={isFollowing(result.email)} onClick={()=>followUser(result)}>Follow</button>
                    </div>)
            })}
            </ul>
            </div>
    );
}

export default SearchBar;