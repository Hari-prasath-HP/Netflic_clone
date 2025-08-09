
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth, 
    signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTRzgwBJVckwkD0ff6B5noczD6bhD8uqo",
  authDomain: "netflix-clone-42d98.firebaseapp.com",
  projectId: "netflix-clone-42d98",
  storageBucket: "netflix-clone-42d98.firebasestorage.app",
  messagingSenderId: "546700279442",
  appId: "1:546700279442:web:ea45ea62f9d246ee13304b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) =>{
    try{
        await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db,"users"), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email})
    }catch(err){
        console.log(err)
        alert(err);
    }
}

const login = async (email,password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
    }catch(err){
        console.log(err)
        alert(err);
    }
}

const logout = () => {
    signOut(auth)
}

export { auth, db, signup, login, logout };
export default app; 