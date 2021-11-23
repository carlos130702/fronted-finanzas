import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5nEoT-DcU0fCyLcyvSInSiaZKhGjTRtQ",
  authDomain: "myfinance-b411c.firebaseapp.com",
  projectId: "myfinance-b411c",
  storageBucket: "myfinance-b411c.appspot.com",
  messagingSenderId: "609541979286",
  appId: "1:609541979286:web:b0abbd818b788ec1b656b7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.database();
