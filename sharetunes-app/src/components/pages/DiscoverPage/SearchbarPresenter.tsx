import SearchbarView from './SearchbarView';
import React, { useState } from 'react';
import firestore from '../../../firestore';
import { useLoggedInUser} from '../../../contexts/LoggedInUserContext';
import { useCurrentlyVisitedUserProfileUpdate } from '../../../contexts/CurrentlyVisitedUserProfileContext';
import { useHistory } from 'react-router';


const SearchBar:React.FC = () => {
    const [searchResults, setSearchResult] = useState<any[]>([]);
    const [typing, setTyping] = useState<boolean>(false);
    const loggedInUser = useLoggedInUser();
    const currentlyVisitedUserProfileUpdate = useCurrentlyVisitedUserProfileUpdate();
    const history = useHistory();

    const findUsers = (val:string) => {
        setSearchResult([]);
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

    const visitProfile = (userToVisit: string) => {
        currentlyVisitedUserProfileUpdate(userToVisit, loggedInUser?.email);
        history.push('/profile');
    };

    return (<div>
        <SearchbarView handleChange={handleChange} searchResults={searchResults} typing={typing} 
        handleClose={handleClose}
        visitProfile={visitProfile}/>
    </div>)

}

export default SearchBar;