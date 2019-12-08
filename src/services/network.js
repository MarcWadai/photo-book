import { photos } from '../store/store.js';

const URL = "BASEURL/data";
const userPass = 'AUTHUSER:AUTHPASS';

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(userPass));

export async function getPhotos() {
    await fetch(URL, {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            return response.json()
        }).then(final => {
            photos.update(p => final);
        })
        .catch(err => console.log(err));
}