
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(email, password) { // Our async function is important because this allows our data to update live rather than waiting to refresh.

        const ret2 = createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                let ret1 = userCredential.user.uid;
            })
            .catch((error) => {
                console.log(error.message)
            }
        );
        return ret2
    }

    async function login(email, password) { 
        await signOut(auth);

        const ret2 = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let ret1 = userCredential.user.uid
        })
        .catch((error) => {
            console.log(error.message)
        });
        return ret2
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