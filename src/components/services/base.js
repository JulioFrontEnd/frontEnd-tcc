import Axios from 'axios';

const API = Axios.create({baseURL: 'https://api-backend-lumen.herokuapp.com/api',});

export default API;