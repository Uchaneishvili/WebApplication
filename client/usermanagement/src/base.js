import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYYZj1f0BnKk4JUll1FT7o-YgfcNG2pyg",
  authDomain: "crud-frb-slider.firebaseapp.com",
  projectId: "crud-frb-slider",
  storageBucket: "crud-frb-slider.appspot.com",
  messagingSenderId: "404551755134",
  appId: "1:404551755134:web:45cca451e1f091390bbf2f",
  measurementId: "G-E991YXNR3R",
};
// Initialize Firebase

export const base = firebase.initializeApp(firebaseConfig);
