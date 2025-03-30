import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');
const loader = document.getElementById('loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
       <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            <div class="info">
              <p><span class="label">Likes</span><span class="value">${likes}</span></p>
              <p><span class="label">Views</span><span class="value">${views}</span></p>
              <p><span class="label">Comments</span><span class="value">${comments}</span></p>
              <p><span class="label">Downloads</span><span class="value">${downloads}</span></p>
            </div>
          </a>
        </li>
      `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'block';
  }
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
}


// loadMoreBtn.classList.remove('is-hidden');
// loadMoreBtn.classList.add('is-hidden');
