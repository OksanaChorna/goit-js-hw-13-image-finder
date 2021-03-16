import { debounce } from 'lodash';
import cardImg from '../templates/galary-img.hbs';
import { searchForm, gallery, btnLoadMore } from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import ApiService from './apiService';
const { defaults, alert, error } = require('@pnotify/core');
defaults.width = '400px';

const apiService = new ApiService();

const renderPhoto = e => {
  e.preventDefault();
  gallery.innerHTML = '';

  btnLoadMore.classList.remove('btn-hidden');

  apiService.query = e.target.value;

  if (apiService.query.trim() === '') {
    return alert({
      text: 'Please try again',
      delay: 2000,
    });
  }
  apiService.resetPage();

  apiService.getPhoto().then(appendPhotoMarkup).catch(onFetchError);
};

searchForm.addEventListener('input', debounce(renderPhoto, 300));

function appendPhotoMarkup(hits) {
  const markup = cardImg(hits);
  gallery.insertAdjacentHTML('beforeend', markup);
}

const onFetchError = errorMessage => {
  error({
    text: errorMessage,
    delay: 3000,
  });
};

const openLargeImg = largeImageURL => {
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
`);
  instance.show();
};

gallery.addEventListener('click', event => {
  const { source } = event.target.dataset;
  if (!source) return;
  openLargeImg(source);
});

const loadMore = () => {
  let windowHeight = gallery.clientHeight + 90;

  apiService.incrementPage();
  apiService
    .getPhoto()
    .then(appendPhotoMarkup)
    .then(() => {
      window.scrollTo({
        top: windowHeight,
        left: 0,
        behavior: 'smooth',
      });
    })
    .catch(onFetchError);
};

btnLoadMore.addEventListener('click', loadMore);
