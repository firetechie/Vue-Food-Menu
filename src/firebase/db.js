import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance

var firebaseConfig = {
  apiKey: "AIzaSyB84zV-bjwbtxG0u74N-0bNSFOkuNYkGrA",
  authDomain: "vue-food-menu.firebaseapp.com",
  databaseURL: "https://vue-food-menu-default-rtdb.firebaseio.com",
  projectId: "vue-food-menu",
  storageBucket: "vue-food-menu.appspot.com",
  messagingSenderId: "101027449546",
  appId: "1:101027449546:web:42643a200bf9c9054fc233"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
