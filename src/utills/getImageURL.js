export default function getImageURL(url){
    const updatedURL = url?.replace('http://localhost:5500', 'http://13.233.137.12:5500' );

    return updatedURL;
}
// http://13.233.137.12/server/api/v1