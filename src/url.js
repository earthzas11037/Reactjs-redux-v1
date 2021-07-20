import axios from 'axios';

// url ของBack-end
const API = axios.create({
    baseURL: `http://localhost:5000/api/`,
    headers: {
        'Content-Type': 'application/json',
    }
});

// url ของFront-end
const url_base = `http://localhost:3000/`;

export {
  API,
  url_base,
}