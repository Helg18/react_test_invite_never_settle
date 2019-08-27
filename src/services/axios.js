import axios from 'axios/dist/axios';

const BASE_URL = 'https://football-players-b31f2.firebaseio.com/players.json';
const request = axios.create({
    baseURL: BASE_URL
});

class Api {
    // Fetch all players
    getAll= async () => request.get()
        .then(function (response) {

            // handle success
            return response.data;
        });
}

// Exporting a new Api object to be used
export default new Api();
