import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};