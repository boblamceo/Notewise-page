import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "notewise-47419.firebaseapp.com",
    projectId: "notewise-47419",
    storageBucket: "notewise-47419.appspot.com",
    messagingSenderId: "785866492477",
    appId: "1:785866492477:web:be1dea1020c6edea273854",
    measurementId: "G-WR3X58CHXN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
