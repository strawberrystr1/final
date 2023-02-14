import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBeM1wecuH-wrtyfwGM_Xz_-zMw-KUhqVE',
  authDomain: 'collector-9139c.firebaseapp.com',
  projectId: 'collector-9139c',
  storageBucket: 'collector-9139c.appspot.com',
  messagingSenderId: '1078620624303',
  appId: '1:1078620624303:web:a7f37a82ba86514c404b5a',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
