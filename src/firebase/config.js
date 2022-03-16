import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWaQhsa_2MMouWaWrTRRaVHJRYytAkFj8",
  authDomain: "cooking-ninja-103e1.firebaseapp.com",
  projectId: "cooking-ninja-103e1",
  storageBucket: "cooking-ninja-103e1.appspot.com",
  messagingSenderId: "895460820175",
  appId: "1:895460820175:web:c64477c4423d3862c423ba",
};

// init firebase

firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
