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
   

   const userSnapshot = await getDoc(userDocRef);
   console.log(userSnapshot);
   console.log(userSnapshot.exists());
   
   //if user data does not exist
   // create / set the document with the data from userAuth in my collection
   if (!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }catch(error){
      console.log('error creating the user',error.message);
    }
   }
  
  // if user data exist
  //return userRefDoc
return userDocRef;
  };