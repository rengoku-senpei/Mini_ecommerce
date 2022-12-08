import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// FireBase Imports
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';

import { useDispatch, useSelector } from 'react-redux';
import { LogInReducer, UserReducer } from './slice/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
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
    <div>
      <Header onSignOut={signOutFromgoogle} onSignIn={signInWithGoogle} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
