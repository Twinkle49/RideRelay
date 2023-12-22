import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkyP0T2f2X1ywDfjCppZaJD_hhurxHRqo",
  authDomain: "riderelay-ed389.firebaseapp.com",
  projectId: "riderelay-ed389",
  storageBucket: "riderelay-ed389.appspot.com",
  messagingSenderId: "274580176660",
  appId: "1:274580176660:web:ec5a72b4f3d85f17144c01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };