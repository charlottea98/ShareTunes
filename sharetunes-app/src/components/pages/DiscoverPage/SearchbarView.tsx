import classes from './searchbar.module.scss';

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
                className={classes.SearchInput}>
        </input>
        <ul hidden={!typing} className={classes.SearchList}>
        <div className={classes.SearchItems}>
            <button onClick={()=>handleClose()}>Close</button>
        </div>
        {searchResults.map(result => {
            return (<div className={classes.SearchItems}>
                {result?.userName}<button disabled={isFollowing(result?.email)} onClick={()=>followUser(result)}>Follow</button>
                </div>)
        })}
        </ul>
        </div>)
}

export default SearchbarView;