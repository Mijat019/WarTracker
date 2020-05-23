import axios from 'axios'

async function reverseGeoCode(lat, lng) {
    try {
        let query = `reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
        let {data} = await axios.get(`https://nominatim.openstreetmap.org/${query}`);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function geoCode(address) {
    let query = `?q=${address}&format=jsonv2&addressdetails=1&limit=6`;
    return axios.get(`https://nominatim.openstreetmap.org/${query}`);
}

export {reverseGeoCode, geoCode};
