import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';



const firebaseConfig = {
  apiKey: "AIzaSyDg3pyjVmu6O1xtTmiAqMSznowz5Bc4sek",
  authDomain: "social-media-amr.firebaseapp.com",
  projectId: "social-media-amr",
  storageBucket: "social-media-amr.appspot.com",
  messagingSenderId: "991261754247",
  appId: "1:991261754247:web:762972b016962c1faec922",
  measurementId: "G-77DG8GZLFL"
  };

    const firebaseApp = initializeApp(firebaseConfig);
    const db          = getFirestore(firebaseApp);


    export default  db;