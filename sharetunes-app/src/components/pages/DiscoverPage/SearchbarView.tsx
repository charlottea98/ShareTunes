import classes from './searchbar.module.scss';
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    handleChange: Function,
    handleClose: Function,
    searchResults: any[],
    typing: boolean,
    isFollowing: Function,
    followUser: Function
}

const SearchbarView:React.FC<Props> = ({handleChange, searchResults, typing, handleClose, isFollowing, followUser}) => {
    return (
        <>
        {typing ? ( 
            <div className={classes.outsideContainer} onClick={()=>handleClose()}/>
        ): (null)}
    <div className={classes.SearchBar}>
        <input type="text"
                name="name"
                placeholder="Search users..."
                onChange={e => {handleChange(e);}}
                onClick={e => handleChange(e)}
                className={classes.SearchInput}
                autoComplete="off"
                id="searchinput">
        </input>
        {typing ? (
            <div>
                <div>
                    <FontAwesomeIcon icon={faTimesCircle} onClick={()=>handleClose()} size='2x' cursor='pointer' color='#fec46e'></FontAwesomeIcon>
                </div>
                <ul className={classes.SearchList}>
                    {searchResults.map((result, idx) => (
            <div className={classes.SearchItems} key={idx}>
                <img src={result?.profilePictureURL} className={classes.SearchItemsImages} ></img>
                <div className={classes.SearchItemsText}>{result?.username}</div>
                {console.log(result)}
            </div>)
        )}
        </ul>
            </div>
        ): (null)}
        </div>
        </>)
}

export default SearchbarView;