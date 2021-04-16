import apiKeys from './apiKeys';

const apiController = () => {
    const clientId = apiKeys.clientId;
    const clientSecret = apiKeys.clientSecret;

    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
            body: 'grant_type=client_credentials',
        });

        const data = await result.json();
        return data.access_token;
    };

    const _getTrack = async (token, trackEndPoint) => {
        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + token },
        });

        const data = await result.json();
        return data;
    };

    return {
        getToken() {
            _getToken();
        },

        getTrack(token, trackEndPoint) {
            _getTrack(token, trackEndPoint);
        },
    };
};

export default apiController;
