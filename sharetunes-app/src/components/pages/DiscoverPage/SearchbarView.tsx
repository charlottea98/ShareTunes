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
    return (<div className={classes.SearchBar}>
        <input type="text"
                name="name"
                placeholder="Search users..."
                onChange={e => {handleChange(e);}}
                className={classes.SearchInput}
                autoComplete="off">
        </input>
        <div hidden={!typing}>
        <FontAwesomeIcon icon={faTimesCircle} onClick={()=>handleClose()} size='2x' cursor='pointer' color='#fec46e'></FontAwesomeIcon>
        </div>
        <ul hidden={!typing} className={classes.SearchList}>
        {searchResults.map((result, idx) => (
            <div className={classes.SearchItems} key={idx}>
                {result?.username}<button disabled={isFollowing(result?.email)} onClick={()=>followUser(result)}>Follow</button>
            </div>)
        )}
        
        </ul>
        </div>)
}

export default SearchbarView;