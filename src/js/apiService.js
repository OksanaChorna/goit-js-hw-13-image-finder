const BASE_URL = 'https://pixabay.com/api/';
const KEY = '20667195-d8cc0b45a3716479e33d72c4b';

const photoApi = {
  getPhoto(query, pageNumber) {
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumber}&per_page=12&key=${KEY}`,
    ).then(result => {
      if (!result.ok) {
        throw result;
      }
      return result.json();
    });
  },
};
export default photoApi;
