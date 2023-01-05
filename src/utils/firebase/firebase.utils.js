import { initializeApp } from 'firebase/app';
import { getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { getFirestore,doc,getDoc,setDoc }from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDUlqq11Qqxyb5lqowE5iiYWJmqqzFU0X8",
    authDomain: "ecommerc-1da0d.firebaseapp.com",
    projectId: "ecommerc-1da0d",
    storageBucket: "ecommerc-1da0d.appspot.com",
    messagingSenderId: "200202016559",
    appId: "1:200202016559:web:3af75b8cbfd7ad7d1833da"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db,'users',userAuth.uid);
   console.log(userDocRef);

   const userSnapShot = await getDoc(userDocRef);
   console.log(userSnapShot);
   console.log(userSnapShot.exists());
  };