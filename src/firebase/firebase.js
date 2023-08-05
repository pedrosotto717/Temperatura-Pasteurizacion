import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdKKXUXAhKWJ3JcTyPANEU_DruX1fW1TY",
  authDomain: "temperatura-pasteurizacion.firebaseapp.com",
  projectId: "temperatura-pasteurizacion",
  storageBucket: "temperatura-pasteurizacion.appspot.com",
  messagingSenderId: "107332324633",
  appId: "1:107332324633:web:083b1c7acffb77de0dc988"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();