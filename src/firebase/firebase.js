import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB6idf6uVcqpgY_8LUiM7iZ91XN6W-heHg",
    authDomain: "weather-auth-dd5bd.firebaseapp.com",
    projectId: "weather-auth-dd5bd",
    storageBucket: "weather-auth-dd5bd.appspot.com",
    messagingSenderId: "339886106536",
    appId: "1:339886106536:web:987f725e6027a54c7adf9d",
    measurementId: "G-6MP222J5N2"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };
