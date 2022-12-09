import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: { successToast: '', errorToast: '' },
  reducers: {
    toastOnSuccess(state, payload) {
      return { ...state, successToast: payload };
    },
    toastOnError(state, payload) {
      return { ...state, errorToast: payload };
    },
  },
});

const { actions, reducer: toast } = toastSlice;
export const { toastOnSuccess, toastOnError } = actions;
export default toast;
