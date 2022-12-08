import { combineReducers } from '@reduxjs/toolkit';
import auth from './authSlice';
import apiData from './apiFetchSlice';

const reducers = combineReducers({ auth, apiData });

export default reducers;
