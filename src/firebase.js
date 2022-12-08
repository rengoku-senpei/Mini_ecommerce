import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcHgDU-ql6-DEuQHTGK_DN-96CxUOTLGQ',
  authDomain: 'virtual-cubist-368110.firebaseapp.com',
  projectId: 'virtual-cubist-368110',
  storageBucket: 'virtual-cubist-368110.appspot.com',
  messagingSenderId: '580099745604',
  appId: '1:580099745604:web:7ac12ce42f82fa98f35911',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
