import axios from "axios";
import { showLoader, hideLoader } from './render-functions';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49539042-7a7029324b91a0a3f345412f4';

export async function getImagesByQuery(query, page = 1) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
    };

    try {
        showLoader();
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch images');
    } finally {
        hideLoader();
    }
}