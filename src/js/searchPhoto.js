// import { debounce } from 'lodash';
// // import lodash from 'lodash';
// import photoApi from './apiService';
// import cardImg from '../templates/galary-img.hbs';
// import { searchForm, gallery, btnLoadMore } from './refs';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
// const { defaults, error } = require('@pnotify/core');
// defaults.width = '400px';

// const openLargeImg = largeImageURL => {
//   const instance = basicLightbox.create(`
//     <img src="${largeImageURL}" width="800" height="600">
// `);
//   instance.show();
// };

// let pageNumber = 1;

// const renderPhoto = e => {
//   e.preventDefault();
//   const query = e.target.value;

//   search(query);
// };

// searchForm.addEventListener('input', debounce(renderPhoto), 500); // ToDo розібратись із дебаунс

// function search(query) {
//   photoApi
//     .getPhoto(query, pageNumber)
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
// gallery.addEventListener('click', event => {
//   const { source } = event.target.dataset;
//   if (!source) return;
//   openLargeImg(source);
// });
