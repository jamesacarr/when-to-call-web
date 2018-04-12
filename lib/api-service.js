import axios from 'axios';

const BASE_URL = `${process.env.API_URL}`;
const api = (url, params) => axios.get(`${BASE_URL}${url}`, { params }).then(({ data }) => data);

export const getPredictions = input => api('/places', { q: input });

export const getDetails = id => api(`/places/${id}`);
