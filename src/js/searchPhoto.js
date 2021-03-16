import { debounce } from 'lodash';
import cardImg from '../templates/galary-img.hbs';
import { searchForm, gallery, btnLoadMore } from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import ApiService from './apiService';
const { defaults, alert, error } = require('@pnotify/core');
defaults.width = '400px';

const apiService = new ApiService();
console.log(apiService);

const renderPhoto = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  //   const searchquery = e.currentTarget.elements.query.value;
  apiService.query = e.target.value;
  if (apiService.query.trim() === '') {
    // ToDo чи треба trim????
    return alert({
      text: 'Please try again',
      delay: 3000,
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
  console.log(source);
  if (!source) return;
  openLargeImg(source);
});

const loadMore = () => {
  let windowHeight = document.documentElement.clientHeight;
  console.log(windowHeight);
  let windowWidth = document.documentElement.clientWidth;
  console.log(windowWidth);

  apiService.incrementPage();
  apiService.getPhoto().then(appendPhotoMarkup).catch(onFetchError);

  window.scrollTo({
    top: windowHeight,
    left: windowWidth,
    behavior: 'smooth',
  });
};

btnLoadMore.addEventListener('click', loadMore);
