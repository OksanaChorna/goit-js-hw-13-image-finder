const BASE_URL = 'https://pixabay.com/api/';
const KEY = '20667195-d8cc0b45a3716479e33d72c4b';

export default class ApiService {
  constructor() {
    this.searchquery = '';
    this.page = 1;
  }

  getPhoto() {
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchquery}&page=${this.page}&per_page=12&key=${KEY}`,
    )
      .then(result => {
        if (!result.ok) {
          throw result;
        }
        return result.json();
      })
      .then(({ hits }) => {
        // this.incrementPage;
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchquery;
  }

  set query(newquery) {
    this.searchquery = newquery;
  }
}

// const photoApi = {
//   getPhoto(searchquery, pageNumber) {
//     return fetch(
//       `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchquery}&page=${pageNumber}&per_page=12&key=${KEY}`,
//     ).then(result => {
//       if (!result.ok) {
//         throw result;
//       }
//       return result.json();
//     });
//   },
// };
// export default photoApi;
