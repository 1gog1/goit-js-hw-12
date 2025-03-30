import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalPage = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements['search-text'].value.trim();
  page = 1;

  if (!query) {
    iziToast.error({
      message: 'Empty input, enter a search value!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    const { hits, totalHits } = data;

    if (hits.length === 0) {
      iziToast.error({
        message: 'Sorry, no images match your query. Try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
    totalPage = Math.ceil(totalHits / 15);

    if (page < totalPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong', position: 'topRight' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    scrollPage();

    if (page >= totalPage) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images',
      position: 'topRight',
    });
  }
});


function scrollPage() {
    const card = document.querySelector('.gallery-item');

    if (card) {
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    };
};