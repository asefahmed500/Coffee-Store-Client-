import { createContext, useEffect, useState } from "react";
import app from './../../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app)

export const AuthContext = createContext(null);
const AuthProvider = ({children }) => {

    const [user,setuser] = useState();
    const [loading, setloading ] = useState(true)

    const createUser = (email,password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const loginuser = (email,password) => {
        setloading(true);

        return signInWithEmailAndPassword(auth,email,password);

    }


    const  logout = () => {
        setloading(true);
        return signOut(auth);
    }
    

    useEffect(() => {
       const unsubsCribe =  onAuthStateChanged( auth , currentUser => {
            console.log("current user ", currentUser);
            setuser(currentUser);
            setloading(false)


        });
        return () => {
            unsubsCribe();
        }
        
        
    },[])



    const userinfo = {
        user,
        createUser,
        loginuser,
        loading,
        logout

    }
    return (
        <AuthContext.Provider value={userinfo}>
            {children}

        </AuthContext.Provider>
            
       
    );
};

export default AuthProvider;