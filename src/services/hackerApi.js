import ApiService from './api';

const BASE_URL = 'https://hn.algolia.com/api/v1/search';
const client = new ApiService({ baseURL: BASE_URL });

const hackerNewsApi = {};

hackerNewsApi.getTopStory = () => client.get(`/?tags=front_page`);
hackerNewsApi.getStoryById = id => client.get(`/?tags=story_:${id}`);
hackerNewsApi.getStoriesByPage = page => client.get(`/?page=${page}`);

export default hackerNewsApi;
