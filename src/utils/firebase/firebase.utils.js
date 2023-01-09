import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
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

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    if(!userAuth) return;
    
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

  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
  };

  export const signOutUser = async() => await signOut(auth);