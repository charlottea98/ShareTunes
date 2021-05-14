import SearchbarView from './SearchbarView';
import React, { useState } from 'react';
import firestore from '../../../firestore';
import firebase from 'firebase/app';
import { useLoggedInUser} from '../../../contexts/LoggedInUserContext';
import { useCurrentlyVisitedUserProfileUpdate } from '../../../contexts/CurrentlyVisitedUserProfileContext';
import { useHistory } from 'react-router';


const SearchBar:React.FC = () => {
    const [searchResults, setSearchResult] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);
    const [typing, setTyping] = useState<boolean>(false);
    const loggedInUser = useLoggedInUser();
    const currentlyVisitedUserProfileUpdate = useCurrentlyVisitedUserProfileUpdate();
    const history = useHistory();

    const findUsers = (val:string) => {
        setSearchResult([]);
        getFollowing();
        firestore.collection('users').get().then(snapshot => {
            snapshot.docs.map(doc => {
                if (doc.data().username.includes(val)){
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

    const visitProfile = (userToVisit: string) => {
        currentlyVisitedUserProfileUpdate(userToVisit, loggedInUser?.email);
        history.push('/profile');
    };


    return (<div>
        <SearchbarView handleChange={handleChange} searchResults={searchResults} typing={typing} 
        handleClose={handleClose} isFollowing={isFollowing} followUser={followUser}
        visitProfile={visitProfile}/>
    </div>)

}

export default SearchBar;