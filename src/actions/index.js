import hackerNewsApi from '../services/hackerApi';

export const actionTypes = {
  FETCH_PAGEDATA: 'FETCH_PAGEDATA',
  FETCH_GRAPHDATA: 'FETCH_GRAPHDATA',
  FETCH_STORYPOINTS: 'FETCH_STORYPOINTS',
  HIDE_STORY: 'HIDE_STORY',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
};

const action = (type, payload) => ({ type, payload })

export const actions = {
  fetchPageData: (payload = {}) => {
    return async dispatch => {
      const data = await hackerNewsApi
        .getStoriesByPage(payload);
      const chartData = {
        ids: [],
        points: []
      }
      data.hits.map((item) => {
        const getLocalStoragePoints = localStorage.getItem(`${item.objectID}points`);
        const getLocalStorageVisibility = localStorage.getItem(`${item.objectID}hide`);
        if(getLocalStoragePoints) {
          item.points = getLocalStoragePoints;
        }
        if(getLocalStorageVisibility) {
          item.visible = false
        } else {
          item.visible = true
        }
        if(item.visible) {  
          chartData.ids.push(item.objectID);
          chartData.points.push(item.points);
        }
        return data;
      });
      dispatch(action(actionTypes.FETCH_SUCCESS, { payload, data, chartData }));
    }
  },
  fetchGraphData: (payload = {}) => ({
    type: actionTypes.FETCH_GRAPHDATA,
    pageId: payload
  }),
  fetchStoryPoints: (storyObjectId = {}) => ({
    type: actionTypes.FETCH_STORYPOINTS,
    storyObjectId
  }),
  hideStory: (storyObjectId = {}) => ({
    type: actionTypes.HIDE_STORY,
    storyObjectId
  })
};
