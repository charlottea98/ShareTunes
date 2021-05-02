import { CLIENT_ID, CLIENT_SECRET } from './keys';
const BASE_ENDPOINT_URL = "https://api.spotify.com/v1/";

export const SpotifySource = {
    async getAccessToken() {
        return fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials'
            }),
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error(`Code "${response.status}" with the message "${response.statusText}"! :(`);
            }
        })
    },
    async apiCall(params: string) {
        const data = await SpotifySource.getAccessToken();

        return fetch(BASE_ENDPOINT_URL + params, {
                    "method": "GET",
                    "headers": {
                        'Authorization': 'Bearer ' + data.access_token
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        throw new Error(`Code "${response.status}" with the message "${response.statusText}"! :(`);
                    }
                })
    },
    async getSongDetails(songId: string) {
        return SpotifySource.apiCall(`tracks/${songId}`).then(data => data);
    }
};
