import React, { useState } from 'react';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import firestore from '../../../firestore';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState<string[]>([]);

    const findUsers = () => {
        setSearchResult([]);
        firestore.collection('users').get().then(snapshot => {
            snapshot.docs.map(doc => {
                if (doc.data().first_name.includes(searchValue)){
                    setSearchResult(oldArray => [...oldArray, doc.data().first_name]);
                }
            })
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
                    {result}<button>Follow</button>
                    </div>)
            })}
            </div>
        </div>
    );
}

export default SearchBar;