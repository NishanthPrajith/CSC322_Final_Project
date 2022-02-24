
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function addusertoDB(name, email, id) {
        await setDoc(doc(db, "Users", id), {
            name: name,
            email: email,
        });
    }

    async function signup(name, email, password) { // Our async function is important because this allows our data to update live rather than waiting to refresh.

        const ret3 = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let ret1 = userCredential.user.uid;
                addusertoDB(name, email, ret1);
                return 1;
            })
            .catch((error) => {
                console.log("Sign Up Error: ", error);
                return error;
            }
        );
        return ret3;
    }

    async function login(email, password) { 
        await signOut(auth);

        const ret2 = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            let ret1 = userCredential.user.uid;
        })
        .catch((error) => {
            return error;
        });
        return 1;
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
        setCurrentUser(user);
        setLoading(false);
    })
    }, [])

    const value = {
        currentUser,
        login,
        signup,
    }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}