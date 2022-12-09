import { combineReducers } from '@reduxjs/toolkit';
import auth from './authSlice';
import apiData from './apiFetchSlice';
import toast from './toastSlice';

const reducers = combineReducers({ auth, apiData, toast });

export default reducers;
