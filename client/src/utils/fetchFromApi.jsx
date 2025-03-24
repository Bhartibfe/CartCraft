import axios from "axios";

const BASE_URL = 'https://fakestoreapi.com'

// const options = {
//     params: {
//         category_id: '2478868012',  
//     },
//     headers: {
//         'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
//         'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
//     }
// };

export const fetchFromApi = async (url) => {
    const response = await axios.get(`${BASE_URL}/${url}`)
    return response.data
}