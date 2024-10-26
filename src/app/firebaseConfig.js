import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBa5KxxVD5AgVlaG6fdX8-iVRUw8i0N6YU",
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
