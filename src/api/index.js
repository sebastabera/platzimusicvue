import config from './config.js';

const API_KEY = config.apiKey

const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${API_KEY}&format=json`;

export default function getArtists(country){
    const url = URL.replace(':country', country)
    return fetch(url)
        .then(res => res.json())
        .then(json => json.topartists.artist);
}