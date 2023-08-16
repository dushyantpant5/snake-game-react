import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD8VSMNFeJx3vKCUly9haj1Ede9KyVyC94",
    authDomain: "snake-game-react-1255e.firebaseapp.com",
    projectId: "snake-game-react-1255e",
    storageBucket: "snake-game-react-1255e.appspot.com",
    messagingSenderId: "282810302266",
    appId: "1:282810302266:web:35375b9b27a66938885a03"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collectionRef = collection(db, 'score-table');

export {collectionRef,db}