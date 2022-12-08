import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: null,
    user: [],
  },
  reducers: {
    LogInReducer(state, action) {
      return { ...state, isLogged: action.payload };
    },
    UserReducer(state, action) {
      return { ...state, user: action.payload };
    },
  },
});

const { actions, reducer: auth } = authSlice;
export const { LogInReducer, UserReducer } = actions;
export default auth;
