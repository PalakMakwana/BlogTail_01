// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore' 
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfO0nUGZP_nKD789un-0xujPwquOc8cE0",
  authDomain: "newblogapp-32065.firebaseapp.com",
  projectId: "newblogapp-32065",
  storageBucket: "newblogapp-32065.appspot.com",
  messagingSenderId: "951896083383",
  appId: "1:951896083383:web:975ae24f0a72a8ff197632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth()
export const db= getFirestore(app);
export  const imagedb= getStorage(app);


export {app,auth
}