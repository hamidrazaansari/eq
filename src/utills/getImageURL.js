export default function getImageURL(url){
    const updatedURL = url?.replace('http://localhost:5500', 'http://http://eq-api.esta-dev.com' );

    return updatedURL;
}
// http://13.233.137.12/server/api/v1