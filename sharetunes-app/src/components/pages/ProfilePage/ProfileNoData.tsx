import { ProgressLoader } from '../../common/ProgressLoader/ProgressLoader';
import classes from '../../pages/DiscoverPage/discoverPage.module.scss';

const profileNoData = (userExists: any, sessionStatus: any) => {
    if (userExists === null && sessionStatus !== null) {
        return (
            <div className={classes.loader}>
                <ProgressLoader></ProgressLoader>
            </div>
        );
    }
};

export default profileNoData;
