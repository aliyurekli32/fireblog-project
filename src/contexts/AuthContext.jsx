import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../helpers/firebase";

const userAuthContext=createContext();

export const UserAuthContextProvider =({ children })=> {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        
          setUser(currentuser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
    
      return (
        <userAuthContext.Provider
          value={{user}}
        >
          {children}
        </userAuthContext.Provider>
      );
    }
    export const useUserAuth=()=> {
        return useContext(userAuthContext);
      }