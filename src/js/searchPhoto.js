import { debounce } from 'lodash';
import cardImg from '../templates/galary-img.hbs';
import { searchForm, gallery, btnLoadMore } from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import ApiService from './apiService';
const { defaults, alert } = require('@pnotify/core');
defaults.width = '400px';

const apiService = new ApiService();
console.log(apiService);

const renderPhoto = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  //   const searchquery = e.currentTarget.elements.query.value;
  apiService.query = e.target.value;
  if (apiService.query === ' ') {
    // ToDo чи треба trim????
    return alert({
      text: 'Please try again',
    });
  }
  apiService.resetPage();

  apiService.getPhoto().then(appendPhotoMarkup);
};

searchForm.addEventListener('input', debounce(renderPhoto, 300));

function appendPhotoMarkup(hits) {
  const markup = cardImg(hits);
  gallery.insertAdjacentHTML('beforeend', markup);
}
// function search(searchquery) {
//   photoApi
//     .getPhoto(searchquery, pageNumber)
//     .then(data => {
//       gallery.innerHTML = '';
//       const { hits } = data;
//       const markup = cardImg(hits);
//       gallery.innerHTML = markup;
//     })
//     .catch(onFetchError);
// }

// const onFetchError = error => {
//   console.log(error);
//   // const { status, statusText } = error;
//   // console.error(`Error with status code: ${status}. Message: ${statusText}`);
//   // error({
//   //   text: error, // ToDo
//   //   delay: 3000,
//   // });
// };

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
  apiService.incrementPage();
  apiService.getPhoto().then(appendPhotoMarkup);
  window.scrollTo({
    top: 100,
    left: 100,
    behavior: 'smooth',
  });
};

btnLoadMore.addEventListener('click', loadMore);
