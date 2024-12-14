const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = `47645607-ed5598dfc4be5ee4996d51637`;

const requestParams = new URLSearchParams({
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
});

const fetchImages = request => {
  requestParams.set('q', request);

  return fetch(`${BASE_URL}?${requestParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch images`);
      }

      return response.json();
    })
    .then(response => {
      if (response.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }

      return response.hits.map(hit => ({
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
        likes: hit.likes,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
      }));
    });
};
export { fetchImages };
