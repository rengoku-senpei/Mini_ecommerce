import services from '../api/services';

export const addToDatabase = (url, payload) => async (dispatch) => {
  await services.addData(url, payload);
};
