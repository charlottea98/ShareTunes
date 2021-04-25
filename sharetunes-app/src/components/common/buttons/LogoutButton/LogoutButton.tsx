import PrimaryButton from '../PrimaryButton/PrimaryButton';
import fire from '../../../../fire';
import { useHistory } from 'react-router';

const LogoutButton = () => {
    const history = useHistory();
    return (
        <PrimaryButton text="Log Out" onButtonClick={() => fire.auth().signOut().then(() => history.push('/login'))}></PrimaryButton>
    )
}

export default LogoutButton;