// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmmiHtbB5gTmk8rNyPxde2qb6gldOKpsE",
  authDomain: "instagram-clone-bc82d.firebaseapp.com",
  projectId: "instagram-clone-bc82d",
  storageBucket: "instagram-clone-bc82d.appspot.com",
  messagingSenderId: "703084514334",
  appId: "1:703084514334:web:f71e2712229a74ced8f20f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };