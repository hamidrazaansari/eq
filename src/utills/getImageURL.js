export default function getImageURL(url){
    const updatedURL = url?.replace('http://localhost:5500', 'http://13.233.121.43:5500');

    return updatedURL;
}