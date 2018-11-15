// import firebase from "@https://www.gstatic.com/firebasejs/5.5.6/firebase.js";
import firebase from "firebase";

let config = {
    apiKey: "AIzaSyA4cw8Drk5fgatKPskRCFtSWvasGiAnw34",
    authDomain: "alfaromeo-23e38.firebaseapp.com",
    databaseURL: "https://alfaromeo-23e38.firebaseio.com",
    projectId: "alfaromeo-23e38",
    storageBucket: "alfaromeo-23e38.appspot.com",
    messagingSenderId: "954918688816"
};
firebase.initializeApp(config);

export default firebase;