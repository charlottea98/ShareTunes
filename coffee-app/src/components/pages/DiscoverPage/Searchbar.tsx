import React, { useState } from 'react';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import firestore from '../../../firestore';
import firebase from 'firebase/app';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);
    const loggedInUser = useLoggedInUser();

    const findUsers = () => {
        setSearchResult([]);
        getFollowing();
        firestore.collection('users').get().then(snapshot => {
            snapshot.docs.map(doc => {
                if (doc.data().userName.includes(searchValue)){
                    setSearchResult(oldArray => [...oldArray, doc.data()]);
                }
            })
        })
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
        <div>
            <input type="text"
                    name="name"
                    placeholder="Search users..."
                    onChange={e => setSearchValue(e.target.value)}>
            </input>
            <PrimaryButton text="Search!" onButtonClick={() => findUsers()}></PrimaryButton>
            <div>
            {searchResults.map(result => {
                return (<div>
                    {result.userName}<button disabled={isFollowing(result.email)} onClick={()=>followUser(result)}>Follow</button>
                    </div>)
            })}
            </div>
        </div>
    );
}

export default SearchBar;