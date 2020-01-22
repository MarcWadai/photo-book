const URL = "BASEURL/data";
const userPass = "AUTHUSER:AUTHPASS";

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(userPass));

export function getPhotos(year) {
    const uri = (year) ? URL + '?year=' + year : URL;
    return fetch(uri, {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            return response.json()
        }).then(final => {
            return Promise.resolve(final);
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err);
        });
}