import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

// FireBase Imports
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';

import { useDispatch, useSelector } from 'react-redux';
import { LogInReducer, UserReducer } from './slice/authSlice';
import styled from 'styled-components';
import { toastOnError, toastOnSuccess } from './slice/toastSlice';

const OutletContainer = styled.div`
  flex: 1;
`;

const App = () => {
  const dispatch = useDispatch();

  const { user, toast } = useSelector((state) => state);

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(UserReducer(user.providerData));
        dispatch(LogInReducer(true));
      } else {
        console.log('no user');
      }
    });
  }, [user]);

  const signOutFromgoogle = () => {
    auth.signOut();
    dispatch(LogInReducer(false));
  };
  const signInWithGoogle = () =>
    signInWithPopup(auth, provider)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* <Snackbar
        open={
          toast.successToast === '' || toast.errorToast === '' ? true : false
        }
        autoHideDuration={2000}
        onClose={() => {
          dispatch(toastOnSuccess(''));
          dispatch(toastOnError(''));
        }}
      >
        {toast.successToast !== '' ? (
          <Alert severity="success" sx={{ width: '100%' }}>
            {toast.successToast}
          </Alert>
        ) : toast.errorToast !== '' ? (
          <Alert severity="warning" sx={{ width: '100%' }}>
            {toast.errorToast}
          </Alert>
        ) : null}
      </Snackbar> */}
      <Header onSignOut={signOutFromgoogle} onSignIn={signInWithGoogle} />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <Footer />
    </div>
  );
};

export default App;
